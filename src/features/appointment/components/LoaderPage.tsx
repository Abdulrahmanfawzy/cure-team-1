export default function LoaderPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-12">
          <div className="absolute inset-0 rounded-full border-4 border-app-primary/20" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-app-primary" />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-app-secondary">Loading...</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Please wait a moment
          </p>
        </div>
      </div>
    </div>
  );
}
