export const getFirstDayLastMonth = () => {
  const today = new Date();

  const firstDayLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  firstDayLastMonth.setHours(0, 0, 0, 0);
  return firstDayLastMonth;
};
