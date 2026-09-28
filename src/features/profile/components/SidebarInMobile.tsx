import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserInformation from "./sidebar/UserInformation";
import Links from "./sidebar/Links";
import type { ProfileResponse } from "../types/profile-type";
import type { ChangeEvent } from "react";
type Props = {
  profile?: ProfileResponse;
  imagePreview: string | null;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;

  isPending: boolean;
};
function SidebarInMobile({
  profile,
  imagePreview,
  onImageChange,

  isPending,
}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-md border border-app-neutral-light px-2 py-1 lg:hidden"
        >
          <Menu />
          <span className="text-lg font-bold">Menu</span>
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-80 max-w-[85%] bg-app-neutral-lightest p-6"
      >
        <div className="flex justify-center gap-12 flex-col">
          {/* User Info */}
          <UserInformation
            imagePreview={imagePreview}
            onImageChange={onImageChange}
            profile={profile}
            isPending={isPending}
          />

          {/* Links */}
          <Links />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SidebarInMobile;
