import { Button } from "@/components/ui/button";

type AppointmentStatus = "Upcoming" | "Completed" | "Canceled";
export default function AppointmentActions({
  status,
}: {
  status: AppointmentStatus;
}) {
  if (status === "Upcoming") {
    return (
      <div className="mt-5 grid grid-cols-2 gap-7">
        <Button
          variant="outline"
          className="      
          "
          size={"xl"}
        >
          Cancel
        </Button>

        <Button
          size={"xl"}
          className="
            bg-app-primary
            
          "
        >
          Reschedule
        </Button>
      </div>
    );
  }

  if (status === "Completed") {
    return (
      <div className="mt-5 grid grid-cols-2 gap-7">
        <Button
          variant="outline"
          className="text-app-primary hover:text-app-primary"
          size={"xl"}
        >
          {status === "Completed" ? "Book again" : "View details"}
        </Button>

        <Button className="bg-app-primary text-white " size={"xl"}>
          Feedback
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-5 grid grid-cols-2 gap-7">
      <Button
        variant="outline"
        className="text-app-primary hover:text-app-primary"
        size={"xl"}
      >
        Book again
      </Button>

      <Button className="bg-app-primary text-white " size={"xl"}>
        Support
      </Button>
    </div>
  );
}
