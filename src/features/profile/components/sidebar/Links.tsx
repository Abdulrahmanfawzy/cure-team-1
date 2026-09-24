import { PATHS } from "@/app/router";
import { cn } from "cn";
import { LogOutIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Links() {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === `${PATHS.profile}/${path}`;

  return (
    <div className="flex gap-4 flex-col justify-center">
      <Link to={PATHS.personalInformation}>
        <div
          className={cn(
            "flex items-center text-app-secondary gap-2  pr-4 pl-3 h-12 rounded-md",
            isActive(PATHS.personalInformation) &&
              "border-2 border-app-primary",
          )}
        >
          <p className="text-app-secondary">Personal information</p>
        </div>
      </Link>

      <Link to={PATHS.passwordManagement}>
        <div
          className={cn(
            "flex items-center text-app-secondary gap-2  pr-4 pl-3 h-12 rounded-md",
            isActive(PATHS.passwordManagement) && "border-2 border-app-primary",
          )}
        >
          <p className="text-app-secondary">Password management</p>
        </div>
      </Link>

      <button className="flex cursor-pointer items-center gap-2 text-app-error  pr-4 pl-3 h-12 rounded-md text-base">
        <LogOutIcon size={24} />
        <span>Log out</span>
      </button>
    </div>
  );
}

export default Links;
