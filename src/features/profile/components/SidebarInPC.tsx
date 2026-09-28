import type { ChangeEvent } from "react";
import type { ProfileResponse } from "../types/profile-type";
import Links from "./sidebar/Links";
import UserInformation from "./sidebar/UserInformation";
type Props = {
  profile?: ProfileResponse;
  imagePreview: string | null;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;

  isPending: boolean;
};
function SidebarInPC({
  profile,
  imagePreview,
  onImageChange,

  isPending,
}: Props) {
  return (
    <div className="max-w-87.5 w-full bg-app-neutral-lightest p-8 rounded-2xl">
      <div className="flex justify-center gap-12 flex-col">
        {/* User Info */}
        <UserInformation
          profile={profile}
          imagePreview={imagePreview}
          onImageChange={onImageChange}
          isPending={isPending}
        />

        {/* Links */}
        <Links />
      </div>
    </div>
  );
}

export default SidebarInPC;
