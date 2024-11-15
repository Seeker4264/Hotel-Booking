export function dateFormat(date: Date) {
  const newDate = date.toISOString().split('T')[0];

  return newDate;
};

export function verifyDates(b_start_date: string, b_end_date: string, n_start_date: string, n_end_date: string) {
  const date1 = new Date(b_start_date);
  const date2 = new Date(b_end_date);
  const date3 = new Date(n_start_date);
  const date4 = new Date(n_end_date);

  if (date1.getTime() === date2.getTime()) return false;
  if (date3.getTime() === date4.getTime()) return false;

  if (date1 > date2) return false;
  if (date3 > date4) return false;

  return (((date2 < date3) && (date1 < date3)) || ((date2 > date4) && (date1 > date4)));
};  
