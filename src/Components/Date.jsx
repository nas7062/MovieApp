import { addMonths, format, isSameDay, isSameMonth, subMonths } from "date-fns";
import useCalendar from "./useCalendar";

const Date = ({ selectedDate, setSelectedDate, setPickerType }) => {

  const { currentMonth, weekDays } = useCalendar(selectedDate);
  const nextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  }
  const prevMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  }
  const ChangeDate = (date) => {
    setSelectedDate(date);
    setPickerType('');
  }
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-3">
        <div className="flex gap-1 caption1">
          <span>{format(selectedDate, 'MMM yyyy')}</span>
          <button type="button" onClick={() => setPickerType('month')} className="text-red-500 pl-5">
            Month
          </button>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={prevMonth}>
            &lt;
          </button>
          <button type="button" onClick={nextMonth}>
            &gt;
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 place-items-center">
        {weekDays.map((days, index) => (
          <div key={index}>{days}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 ">
        {currentMonth.map((date, index) => (
          <button
            key={index}
            className="p-2 rounded-full"
            type="button"
            onClick={() => ChangeDate(date)}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Date;