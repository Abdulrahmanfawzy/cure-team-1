import { Skeleton } from "@/components/ui/skeleton";

function ProfileSkeleton() {
  return (
    <div className="grid min-h-screen grid-cols-12 items-start gap-6">
      {/* Sidebar */}
      <Skeleton className="hidden h-100 w-full max-w-87.5 lg:col-span-4 lg:block" />

      {/* Content */}
      <div className="col-span-12 lg:col-span-8">
        <div className="grid grid-cols-12 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="col-span-12 space-y-2 md:col-span-6">
              {/* Label */}
              <Skeleton className="h-4 w-24" />

              {/* Input */}
              <Skeleton className="h-10 w-full" />
            </div>
          ))}

          {/* Location */}
          <div className="col-span-12 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton;
