"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { lookup } from "country-data-list";

export const CountryDropdown = ({
  onChange,
  value,
  placeholder = "Select country",
  className,
  ...props
}) => {
  const allCountries = lookup.countries({ status: "assigned" });

  const handleValueChange = (alpha3) => {
    const country = allCountries.find((c) => c.alpha3 === alpha3);
    if (country) {
      onChange?.(country);
    }
  };

  return (
    <>
      <input type="hidden" name={props.name || "country"} value={value || ""} />
      <Select onValueChange={handleValueChange} value={value} {...props}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {allCountries
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((country) => (
              <SelectItem key={country.alpha3} value={country.alpha3}>
                {country.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  );
};
