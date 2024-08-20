"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";

export interface ISubmitButtonProps extends ComponentProps<"button"> {
  readonly pendingText?: string;
};

export default function SubmitButton({ children, pendingText, ...props }: ISubmitButtonProps) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button {...props} type="submit" aria-disabled={pending}>
      {isPending ? pendingText : children}
    </button>
  );
}
