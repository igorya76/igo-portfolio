import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { NumericFormatProps, NumericFormat } from "react-number-format";
import React from "react";

type tProps = TextFieldProps & {
  name: string;
  // handleChange?: (value: string) => void;
  readonly?: boolean;
  decimalScale?: number;
  isCurrency?: boolean;
};
export function NumberInput(p: tProps) {
  return (
    <NumericFormat
      fullWidth={true}
      value={p.value as string}
      onChange={p.onChange}
      customInput={TextField}
      thousandSeparator
      valueIsNumericString
      decimalScale={p.decimalScale || 0}
      sx={{
        textAlign: "right",
      }}
      variant="outlined"
      label={p.label}
      slotProps={{
        input: {
          readOnly: p.readonly,
          startAdornment: p.isCurrency && (
            <InputAdornment position="start">$</InputAdornment>
          ),
          inputProps: {
            style: {
              textAlign: "right",
            },
          },
        },
      }}
    />
  );
}
