import React, {forwardRef} from "react";
import {
  Textarea as TextAreaBase,
  TextAreaProps,
} from "@nextui-org/input";

interface TProps extends TextAreaProps {}

const Textarea = forwardRef<HTMLTextAreaElement, TProps>(
  (
    { color = "primary", variant = "bordered", radius = "none", ...props },
    ref
  ) => (
    <TextAreaBase
      ref={ref}
      color={color}
      radius={radius}
      variant={variant}
      minRows={6}
      {...props}
    />
  )
);
Textarea.displayName = "TextArea";

export {Textarea}