export default function DoctorStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <div
        className="
          mx-auto
          flex
          h-15.5
          w-15.5
          items-center
          justify-center
          rounded-full
          bg-white
          text-[#071B35]
        "
      >
        {icon}
      </div>

      <p className="mt-2 text-base font-medium text-[#596271]">{value}</p>

      <p className="text-sm text-[#9298A0]">{label}</p>
    </div>
  );
}
