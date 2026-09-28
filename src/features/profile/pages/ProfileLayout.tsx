import { Outlet } from "react-router-dom";
import { toast } from "sonner";

import SidebarInPC from "../components/SidebarInPC";
import SidebarInMobile from "../components/SidebarInMobile";
import { useEditProfile, useProfile } from "../hooks/profile-hooks";
import ProfileSkeleton from "../components/ProfileSkeleton";
import { useState, type ChangeEvent } from "react";
import type { UserImage } from "../types/profile-type";

function ProfileLayout() {
  const { isLoading, data: profile, isError, error } = useProfile();
  const { mutate, isPending } = useEditProfile();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // Edit Image
  const handleEditImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const profile_image: UserImage = {
        profile_image: file,
      };
      mutate(profile_image, {
        onSuccess: (data) => {
          console.log(data);
          toast.success(data.message);
        },
        onError: (error) => {
          console.log(error?.response);
          toast.error(error?.response?.data?.message);
        },
      });
    }
  };

  // Error message
  if (isError) {
    toast.error(error?.response?.data?.message);
  }

  // Loading
  if (isLoading) {
    return (
      <div className="main_container my-16">
        <ProfileSkeleton />;
      </div>
    );
  }

  return (
    <div className="main_container my-16">
      <div className="grid min-h-screen grid-cols-12 items-start gap-6">
        <div className="hidden lg:col-span-4 lg:block">
          <SidebarInPC
            imagePreview={imagePreview}
            onImageChange={handleEditImage}
            profile={profile?.data}
            isPending={isPending}
          />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <SidebarInMobile
            imagePreview={imagePreview}
            onImageChange={handleEditImage}
            profile={profile?.data}
            isPending={isPending}
          />

          <div className="mt-4">
            <Outlet context={{ profile }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
