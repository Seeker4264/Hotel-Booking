export function checkDateValidity(date: string) {
  const currentDate = new Date();
  const specDate = new Date(date);

  return (currentDate <= specDate);
};

export function verifyDates(start_date: string, end_date: string) {
  const date1 = new Date(start_date);
  const date2 = new Date(end_date);

  return (date1.getTime() !== date2.getTime());
};

export function dateFormat(date: Date) {
  const newDate = date.toISOString().split('T')[0];

  return newDate;
};
