import { Spinner } from "@/components/ui/spinner";

function LogoutLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Spinner />
        <span>Logging out...</span>
      </div>
    </div>
  );
}

export default LogoutLoading;
