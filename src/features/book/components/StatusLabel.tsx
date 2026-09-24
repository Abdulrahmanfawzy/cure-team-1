type AppointmentStatus = "Upcoming" | "Completed" | "Canceled";
export default function StatusLabel({ status }: { status: AppointmentStatus }) {
  const statusClasses = {
    Upcoming: "text-[#1762BD]",
    Completed: "text-[#32B54A]",
    Canceled: "text-[#FF3D3D]",
  };

  return (
    <span
      className={`
        shrink-0
        text-base
        font-montserrat
        ${statusClasses[status]}
      `}
    >
      {status}
    </span>
  );
}
