
import * as React from "react";
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";

export interface ButtonProps extends MuiButtonProps {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "contained", size = "medium", asChild = false, ...props }, ref) => {
    return (
      <MuiButton
        ref={ref}
        variant={variant}
        size={size}
        className={className}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
