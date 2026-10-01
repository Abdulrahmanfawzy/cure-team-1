import { Button } from "@/components/ui/button";

export default function CircleIconButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      className="
        flex
        h-13
        w-13
        rounded-full
        bg-white
        p-0
        text-[#071B35]
        shadow-none
        hover:bg-white
      "
    >
      {children}
    </Button>
  );
}
