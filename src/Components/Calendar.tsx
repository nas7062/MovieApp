// DatePicker.js
import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import Dates from './Date';
import Months from './Month';
interface Calendarprops {
  setSelectedDated: (date:string) => void;
}
const Calendar: React.FC<Calendarprops> = ({ setSelectedDated }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pickerType, setPickerType] = useState('');

  const ref = useRef<HTMLDivElement>(null);

  const toggleDatePicker = () => {
    setPickerType(prev => (prev === '' ? 'date' : ''));
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target instanceof Node && ref.current && !ref.current.contains(e.target)) {
      setPickerType('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setSelectedDated(format(selectedDate, 'yyyy년 MM월 dd일'));
  }, [selectedDate, setSelectedDated]);
  const renderPickerByType = (type: string) => {
    switch (type) {
      case 'date':
        return (
          <Dates
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setPickerType={setPickerType}
          />
        );
      case 'month':
        return (
          <Months
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setPickerType={setPickerType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-400 ">
      <p className="bg-black text-white text-center w-72 ">날짜</p>
      <div className="relative bg-white" ref={ref}>
        <input
          type="text"
          value={format(selectedDate, 'yyyy년 MM월 dd일')}
          className="p-2 border rounded-[10px] focus:outline-primary body1 text-center cursor-pointer"
          readOnly
          onClick={toggleDatePicker}
        />
        {pickerType !== '' && (
          <div className="absolute rounded-[10px] p-3 z-50 mt-2 w-72 bg-white shadow-lg caption2 animate-dropdown">
            {renderPickerByType(pickerType)}
          </div>
        )}
      </div>
    </div>

  );
}

export default Calendar;
