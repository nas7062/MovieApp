import { addYears, format, isSameMonth, subYears } from "date-fns";
import useCalendar from "./useCalendar";

const Month = ({ selectedDate, setSelectedDate,setPickerType}) => {
  const { allMonth } = useCalendar(selectedDate);
  const nextYear = () => {
    setSelectedDate(addYears(selectedDate, 1));
  }
  const prevYear = () => {
    setSelectedDate(subYears(selectedDate, 1));
  }
  const changeMonth = (month) => {
    setSelectedDate(month);
    setPickerType('');
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between w-full p-2">
        <span className="flex gap-1 caption1">
          {format(selectedDate, 'yyyy')}
          <button type="button" onClick={()=>setPickerType('date')} className="text-red-500 pl-5" >
            Day
          </button>
        </span>
        <div>
          <button type="button" onClick={prevYear}>
            &lt;
          </button>
          <button type="button" onClick={nextYear}>
            &gt;
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3">
        {allMonth.map((month, index) => (
          <button
            type="button"
            key={index}
            className={` rounded-full p-2 caption2
            ${isSameMonth(selectedDate, month)
                ? 'bg-primary-200 text-red-600'
                : 'hover:bg-primary-50 hover:text-primary-200'
              }`}
            onClick={() => changeMonth(month)}
          >
            {format(month, 'MMM')}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Month;