import { FormInput } from "@/components/shared/common/form-inputs/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInformationSchema } from "../schemas/profile-schema";
import { useOutletContext } from "react-router-dom";
import {
  type ProfileResponse,
  type PersonalInformationPayload,
} from "../types/profile-type";
import { type ApiResponse } from "@/types/api";
import { useEffect, useState } from "react";
import { useEditProfile } from "../hooks/profile-hooks";
import { toast } from "sonner";

type ProfileOutletContext = {
  profile?: ApiResponse<ProfileResponse>;
};
const PersonalInformationForm = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { profile } = useOutletContext<ProfileOutletContext>();

  // React hook form
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<PersonalInformationPayload>({
    resolver: zodResolver(PersonalInformationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      birth_date: "",
      location: "",
    },
  });

  useEffect(() => {
    if (!profile?.data) return;
    reset({
      name: profile.data.name,
      phone: profile.data.phone,
      email: profile.data.email,
      birth_date: profile.data.birth_date ?? undefined,
      location: profile.data.location ?? undefined,
    });
  }, [profile, reset]);

  // Edit Profile
  const { mutate, isPending } = useEditProfile();

  // Use On Edit Data
  const onSubmit = (payload: PersonalInformationPayload) => {
    mutate(payload, {
      onSuccess: (data) => {
        console.log(data);
        toast.success(data.message ?? "Profile Updated Successfully");
        setEditMode(!editMode);
      },
      onError: (error) => {
        console.log(error.response);
        toast.error(error.response?.data?.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-8">
      {/* Full Name */}
      <div className="col-span-12 w-full md:col-span-6">
        <FormInput
          control={control}
          label="Full Name"
          name="name"
          readOnly={!editMode}
          placeholder="Full Name"
        />
      </div>
      {/* Phone */}
      <div className="col-span-12 w-full md:col-span-6">
        <FormInput
          control={control}
          label="Phone Number"
          name="phone"
          readOnly={!editMode}
          placeholder="Phone Number"
        />
      </div>
      {/* email */}
      <div className="col-span-12 w-full md:col-span-6">
        <FormInput
          control={control}
          label="Email"
          name="email"
          readOnly={!editMode}
          placeholder="Email"
        />
      </div>
      {/* Birth Date */}
      <div className="col-span-12 w-full md:col-span-6">
        <FormInput
          control={control}
          label="Birth Date"
          name="birth_date"
          type="date"
          readOnly={!editMode}
          placeholder="Email"
        />
      </div>
      {/* Location */}
      <div className="col-span-12">
        <FormInput
          control={control}
          label="Location"
          name="location"
          placeholder="Location"
          readOnly={!editMode}
        />
      </div>

      {/* Actions */}
      <div className="col-span-12 flex justify-center">
        {editMode ? (
          <div className="flex gap-4">
            <Button
              variant={"default"}
              type="submit"
              disabled={!isDirty || isPending}
              className="w-1/2"
            >
              {isPending ? "Loading..." : "Save Edits"}
            </Button>
            <Button
              variant={"destructive"}
              type="button"
              onClick={() => setEditMode(!editMode)}
              className="w-1/2"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant={"secondary"} onClick={() => setEditMode(true)}>
            Enable Edit
          </Button>
        )}
      </div>
    </form>
  );
};

export default PersonalInformationForm;
