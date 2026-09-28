import { MapPinned, Pencil } from "lucide-react";
import userImage from "@/assets/images/profile-avatar.jpg";
import type { ProfileResponse } from "../../types/profile-type";
import type { ChangeEvent } from "react";
import { cn } from "cn";
type Props = {
  profile?: ProfileResponse;
  imagePreview: string | null;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isPending: boolean;
};
function UserInformation({
  profile,
  imagePreview,
  onImageChange,
  isPending,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* User Image */}
      <div className="relative h-28.25 w-28.25">
        <img
          src={imagePreview ?? profile?.profile_image ?? userImage}
          alt={profile?.name ?? "Profile image"}
          className="h-full w-full rounded-full object-cover"
        />

        {/* Edit Image Button */}
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          id="editImage"
          disabled={isPending}
          className="sr-only"
        />
        <label
          htmlFor="editImage"
          className={cn(
            "absolute bottom-1 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-app-primary text-white shadow-md transition hover:opacity-90",
            isPending
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:opacity-90",
          )}
          aria-label="Edit profile image"
        >
          <Pencil size={15} />
        </label>
      </div>

      <p className="text-app-neutral-lighter text-sm">
        {isPending && "Uploading Image..."}
      </p>

      {/* User Information */}
      <div className="flex flex-col items-center justify-center gap-1">
        <h2 className="font-noto-serif-georgian text-xl font-normal text-app-secondary">
          {profile?.name}
        </h2>

        <p className="flex items-center justify-center gap-0.5 text-sm text-app-neutral-darker">
          <MapPinned size={16} />
          <span>{profile?.location}</span>
        </p>
      </div>
    </div>
  );
}

export default UserInformation;
