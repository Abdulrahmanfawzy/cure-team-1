import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  useState,
  type ComponentProps,
  type HTMLInputTypeAttribute,
} from "react";
import {
  Controller,
  type Path,
  type Control,
  type FieldValues,
} from "react-hook-form";

interface FormPasswordProps<Type extends FieldValues> {
  name: Path<Type>;
  control: Control<Type>;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}

function FormPassword<Type extends FieldValues>({
  control,
  label,
  name,
  placeholder,
  type = "password",
  ...props
}: FormPasswordProps<Type> & ComponentProps<"input">) {
  const [switchPasswordType, setSwitchPasswordType] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <Field>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                placeholder={placeholder}
                type={switchPasswordType ? "text" : "password"}
                id={name}
                {...props}
              />
              <InputGroupAddon
                onClick={() => setSwitchPasswordType((prev) => !prev)}
                align={"inline-end"}
              >
                {switchPasswordType ? <EyeIcon /> : <EyeOffIcon />}
              </InputGroupAddon>
            </InputGroup>
          </Field>
          {fieldState.error && (
            <FieldError>{fieldState?.error?.message}</FieldError>
          )}
        </div>
      )}
    />
  );
}

export default FormPassword;
