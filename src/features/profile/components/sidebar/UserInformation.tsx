import { MapPinned } from "lucide-react";
import userImage from "@/assets/images/profile-avatar.jpg";

function UserInformation() {
  return (
    <div className="flex justify-center gap-4 flex-col items-center">
      {/* User Image */}
      <div className="h-28.25 w-28.25 rounded-full">
        <img
          src={userImage}
          alt="USer Image"
          className="w-full h-full rounded-full"
        />
      </div>
      {/* User Information  */}
      <div className="flex gap-1 justify-center items-center flex-col">
        <h2 className="text-xl text-app-secondary font-noto-serif-georgian font-normal">
          Seif Mohamed
        </h2>
        <p className="flex justify-center items-center text-app-neutral-darker gap-0.5 text-sm">
          <MapPinned size={16} />
          <span>129,El-Nasr Street, Cairo</span>
        </p>
      </div>
    </div>
  );
}

export default UserInformation;
