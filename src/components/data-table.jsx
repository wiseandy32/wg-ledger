/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "./date-range-picker";

export function DataTable({
  columns,
  conversionColumns,
  data,
  hideFilters = false,
  defaultType,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState(
    defaultType ? [{ id: "type", value: defaultType }] : []
  );
  const [, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  // Determine which columns to use based on the "type" filter
  const typeFilterValue = columnFilters.find((f) => f.id === "type")?.value;
  const activeColumns =
    typeFilterValue === "conversion" && conversionColumns
      ? conversionColumns
      : columns;

  const table = useReactTable({
    data,
    columns: activeColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleDateRangeChange = useCallback(
    (range) => {
      setDateRange(range);
      if (range.from && range.to) {
        table.getColumn("creationDate")?.setFilterValue([range.from, range.to]);
      } else {
        table.getColumn("creationDate")?.setFilterValue(undefined);
      }
    },
    [table]
  );

  const handleClearFilters = useCallback(() => {
    table.getColumn("type")?.setFilterValue("");
    table.getColumn("status")?.setFilterValue("");
    table.getColumn("creationDate")?.setFilterValue(undefined);
    setDateRange({ from: undefined, to: undefined });
  }, [table]);

  // Effect to handle status filter when type is conversion
  const typeFilter = table.getColumn("type")?.getFilterValue();
  useState(() => {
    if (typeFilter === "conversion") {
      // Auto set status to undefined/all or specific logic if needed, but per requirements we just disable the UI
      // If we strictly want to show ONLY completed conversions, we might set status, but "conversion" type implies completed usually.
      // Let's clear status filter to ensure we see all conversions.
      table.getColumn("status")?.setFilterValue("");
    }
  }, [typeFilter]);

  return (
    <div>
      {!hideFilters && (
        <div className="flex flex-wrap items-center gap-4 py-4">
          <Select
            value={table.getColumn("type")?.getFilterValue() ?? "all"}
            onValueChange={(value) =>
              table
                .getColumn("type")
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="md:max-w-[180px]">
              {/* <SelectTrigger> */}
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="withdrawal">Withdrawal</SelectItem>
              <SelectItem value="conversion">Conversion</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={table.getColumn("status")?.getFilterValue() ?? "all"}
            onValueChange={(value) =>
              table
                .getColumn("status")
                ?.setFilterValue(value === "all" ? "" : value)
            }
            disabled={
              table.getColumn("type")?.getFilterValue() === "conversion"
            }
          >
            <SelectTrigger className="md:max-w-[180px]">
              {/* <SelectTrigger> */}
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
              {/* "completed" is not a selectable option for normal transactions per user request implicitly */}
            </SelectContent>
          </Select>
          <DateRangePicker onDateRangeChange={handleDateRangeChange} />
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="ml-auto"
          >
            Clear Filters
          </Button>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="whitespace-nowrap"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No available transactions.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
