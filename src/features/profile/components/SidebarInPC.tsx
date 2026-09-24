import Links from "./sidebar/Links";
import UserInformation from "./sidebar/UserInformation";

function SidebarInPC() {
  return (
    <div className="max-w-87.5 w-full bg-app-neutral-lightest p-8 rounded-2xl">
      <div className="flex justify-center gap-12 flex-col">
        {/* User Info */}
        <UserInformation />

        {/* Links */}
        <Links />
      </div>
    </div>
  );
}

export default SidebarInPC;
