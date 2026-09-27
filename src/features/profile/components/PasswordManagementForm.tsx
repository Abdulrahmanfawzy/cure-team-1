import { FormInput } from "@/components/shared/common/form-inputs/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { PasswordManagementSchema } from "../schemas/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PasswordManagementType } from "../types/profile-type";

function PasswordManagementForm() {
  const {
    control,
    handleSubmit,

    formState: { isValidating },
  } = useForm<PasswordManagementType>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(PasswordManagementSchema),
  });

  const onSubmit = (data: PasswordManagementType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-12 gap-8 md:gap-12"
    >
      {/* Old Password */}
      <div className="col-span-12 w-full md:col-span-6">
        <FormInput
          control={control}
          label="Old Password"
          name="oldPassword"
          placeholder="Old Password"
        />
      </div>

      {/* New Password */}
      <div className="col-span-12 w-full md:col-span-6">
        <FormInput
          control={control}
          label="New Password"
          name="newPassword"
          placeholder="New Password"
        />
      </div>

      {/* confirm New Password */}
      <div className="col-span-12 w-full md:col-span-6">
        <FormInput
          control={control}
          label="Confirm New Password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
        />
      </div>

      <div className="col-span-12 flex justify-center">
        <Button disabled={isValidating} type="submit" className="w-1/2">
          Change Password
        </Button>
      </div>
    </form>
  );
}

export default PasswordManagementForm;
