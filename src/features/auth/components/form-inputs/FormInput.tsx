import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import type { ComponentProps, HTMLInputTypeAttribute } from "react";

interface FormInputProps<Type extends FieldValues> {
  name: Path<Type>;
  control: Control<Type>;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

export function FormInput<Type extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  ...props
}: FormInputProps<Type> & ComponentProps<"input">) {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Field>
              <FieldLabel htmlFor={name}>{label}</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id={name}
                  type={type}
                  placeholder={placeholder}
                  {...props}
                />
              </InputGroup>
            </Field>
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </>
        )}
      />
    </div>
  );
}
