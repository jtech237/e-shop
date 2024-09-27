import {
  Button as ButtonBase,
  ButtonProps,
  ButtonGroup as ButtonGroupBase,
  ButtonGroupProps,
} from "@nextui-org/button";
import { forwardRef } from "react";

interface BtnProps extends ButtonProps {}
interface BtnGroupProps extends ButtonGroupProps {}

const Button = forwardRef<HTMLButtonElement, BtnProps>(
  ({ color = "primary", size = "md", radius = "sm", ...props }, ref) => (
    <ButtonBase
      ref={ref}
      color={color}
      size={size}
      radius={radius}
      {...props}
    />
  )
);

Button.displayName = "Button";

const ButtonGroup = forwardRef<HTMLDivElement, BtnGroupProps>(
  ({ color = "primary", size = "md", radius = "sm", ...props }, ref) => (
    <ButtonGroupBase
      ref={ref}
      color={color}
      size={size}
      radius={radius}
      {...props}
    />
  )
);

ButtonGroup.displayName = "ButtonGroup";

export { Button, ButtonGroup };
