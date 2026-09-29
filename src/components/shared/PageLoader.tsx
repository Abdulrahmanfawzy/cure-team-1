import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 size={40} className="animate-spin text-app-primary" />
    </div>
  );
}
