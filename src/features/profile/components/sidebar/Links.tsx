import { cn } from "cn";
import { LockKeyholeIcon, LogOutIcon, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  {
    icon: UserCircle,
    label: "Personal information",
    Path: "/profile/personal-information",
    isActive: true,
  },
  {
    icon: LockKeyholeIcon,
    label: "Password management",
    Path: "/profile/password-management",
    isActive: false,
  },
];
function Links() {
  return (
    <div className="flex gap-4 flex-col justify-center">
      {links.map(({ icon: Icon, label, Path, isActive }) => (
        <Link to={Path}>
          <div
            className={cn(
              "flex items-center text-app-secondary gap-2  pr-4 pl-3 h-12 rounded-md",
              isActive && "border-2 border-app-primary",
            )}
          >
            <Icon />
            <p className="text-app-secondary">{label}</p>
          </div>
        </Link>
      ))}

      <button className="flex cursor-pointer items-center gap-2 text-app-error  pr-4 pl-3 h-12 rounded-md text-base">
        <LogOutIcon size={24} />
        <span>Log out</span>
      </button>
    </div>
  );
}

export default Links;
