export const formatDateAppointment = (date: string) => {
  const parsedDate = new Date(date);

  return {
    dayName: parsedDate.toLocaleDateString("en-US", {
      weekday: "long",
    }),

    dayNumber: parsedDate.getDate(),

    month: parsedDate.toLocaleDateString("en-US", {
      month: "long",
    }),

    fullDate: parsedDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
};
