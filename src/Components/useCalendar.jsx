import {
  format,
  addMonths,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  startOfYear,
  isSameMonth,
} from "date-fns"
const useCalendar = (selectedDate) => {
  const weekDays = [];
  const weekStartDate = startOfWeek(new Date());

  for (let i = 0; i < 7; i++) {
    weekDays.push(format(addDays(weekStartDate, i), 'EEEEE'));
  }
  const allMonth = [];
  const startMonth = startOfYear(selectedDate);
  for (let i = 0; i < 12; i++) {
    allMonth.push(addMonths(startMonth, i));
  }
  const StartDate = startOfWeek(startMonth);
  const endDate = endOfWeek(endOfMonth(selectedDate));
  const Allmonth = eachDayOfInterval({ start: StartDate, end: endDate });
  const currentMonth = Allmonth.filter((date)=>isSameMonth(date,selectedDate));
  return { weekDays, allMonth, Allmonth ,currentMonth };
}
export default useCalendar;