import { FormInput } from "@/components/shared/common/form-inputs/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import type { PersonalInformationType } from "../types/profile-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInformationSchema } from "../schemas/profile-schema";

const PersonalInformationForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<PersonalInformationType>({
    defaultValues: {
      name: "Mohammed",
      phone: "0114154740",
      email: "mohammed@gmail.com",
      location: "129,El-Nasr Street, Cairo",
    },
    resolver: zodResolver(PersonalInformationSchema),
  });

  const onSubmit = (data: PersonalInformationType) => {
    if (isDirty) {
      console.log(data);
      reset(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-12 gap-8 md:gap-12"
    >
      <div className="col-span-12 w-full md:col-span-6">
        <FormInput
          control={control}
          label="Full Name"
          name="name"
          placeholder="Full Name"
        />
      </div>
      <div className="col-span-12 w-full md:col-span-6">
        <FormInput
          control={control}
          label="Phone Number"
          name="phone"
          placeholder="Phone Number"
        />
      </div>
      <div className="col-span-12 w-full md:col-span-6">
        <FormInput
          control={control}
          label="Email"
          name="email"
          placeholder="Email"
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <FormInput
          control={control}
          label="Location"
          name="location"
          placeholder="Location"
        />
      </div>
      <div className="col-span-12 flex justify-center">
        {/* {readMode ? (
            <Button
              variant={"secondary"}
              type="button"
              onClick={() => setReadMode(!readMode)}
              className="w-1/2"
            >
              Edite
            </Button>
          ) : (
          )} */}
        {/* <div className="flex gap-4">
              <Button
                variant={"destructive"}
                type="button"
                onClick={() => setReadMode(!readMode)}
                className="w-1/2"
              >
                Cansel
              </Button>
            </div> */}
        <Button type="submit" disabled={!isDirty} className="w-1/2">
          Save Change
        </Button>
      </div>
    </form>
  );
};

export default PersonalInformationForm;
