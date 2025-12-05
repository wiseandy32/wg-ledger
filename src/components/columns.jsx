import { Badge } from "@/components/ui/badge";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { formatNumberWithCommas } from "@/lib/helpers";

export const columns = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <p>{row.original?.id?.slice(0, 7)}</p>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <span className="capitalize">{row.original.type}</span>,
  },
  {
    accessorKey: "details", // Virtual column for Coin / Conversion Details
    header: "Details",
    cell: ({ row }) => {
      const type = row.original.type;
      if (type === "conversion") {
        return (
          <div className="flex flex-col">
            <span className="font-medium">
              {row.original.fromCoinSymbol} &rarr; {row.original.toCoinSymbol}
            </span>
            <span className="text-xs text-muted-foreground">
              {parseFloat(row.original.fromQty).toFixed(6)} &rarr;{" "}
              {parseFloat(row.original.toQty).toFixed(6)}
            </span>
          </div>
        );
      }
      return <p>{row.original.coin || row.original.method || "N/A"}</p>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount ($)",
    cell: ({ row }) => {
      const type = row.original.type;
      const amount =
        type === "conversion" ? row.original.fromAmount : row.original.amount;
      
      // For conversions, we just show the USD value involved
      if (type === "conversion") {
         return <span>${formatNumberWithCommas(amount)}</span>;
      }

      return (
        <p className="flex gap-1 items-center">
          {type === "deposit" ? (
            <Plus className="text-green-500 w-2" />
          ) : (
            <Minus className="text-red-500 w-2" />
          )}
          <span
            className={`${
              type === "deposit" && row.original.status === "confirmed"
                ? "text-green-500"
                : type === "withdrawal" && row.original.status === "confirmed"
                ? "text-red-500"
                : ""
            }`}
          >
            {`$${formatNumberWithCommas(amount)}`}
          </span>
        </p>
      );
    },
  },
  {
    accessorKey: "creationDate",
    header: "Date",
    filterFn: (row, id, value) => {
      const [start, end] = value;
      const rowDate = new Date(row.getValue(id));
      return rowDate >= start && rowDate <= end;
    },
    cell: ({ row }) => {
        // Fallback for conversion date which might be distinct or use same field
        return <p>{row.original.creationDate || row.original.date}</p>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={"outline"}
          className={`${
            status === "confirmed" || status === "completed"
              ? "text-green-500 border-green-500"
              : status === "declined"
              ? "text-red-500 border-red-500"
              : ""
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
];



export const conversionColumns = columns;
