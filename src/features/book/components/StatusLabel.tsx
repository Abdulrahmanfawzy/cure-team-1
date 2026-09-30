type AppointmentStatus = "upcoming" | "completed" | "canceled" | "pending";
export default function StatusLabel({ status }: { status: AppointmentStatus }) {
  const statusClasses = {
    upcoming: "text-[#1762BD]",
    completed: "text-[#32B54A]",
    canceled: "text-[#FF3D3D]",
    pending: "text-[#ff9800]",
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
