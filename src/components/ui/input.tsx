import React, { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { Input as InputBase, InputProps } from "@nextui-org/input";

import {
  Select as SelectBase,
  SelectProps,
  SelectItem,
} from "@nextui-org/select";

interface Props extends InputProps {}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      color = "primary",
      size = "sm",
      radius = "none",
      variant = "bordered",
      ...props
    },
    ref
  ) => {
    return (
      <InputBase
        ref={ref}
        color={color}
        size={size}
        radius={radius}
        variant={variant}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface SProps extends Omit<SelectProps, "children"> {
  data: { label: string; value: string | number }[];
}
const Select = forwardRef<HTMLSelectElement, SProps>(
  (
    {
      data,
      radius = "none",
      color = "primary",
      variant = "bordered",
      ...props
    },
    ref
  ) => (
    <SelectBase
      {...props}
      radius={radius}
      color={color}
      variant={variant}
      ref={ref}
    >
      {data.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectBase>
  )
);
Select.displayName = "Select";

export { Input };
