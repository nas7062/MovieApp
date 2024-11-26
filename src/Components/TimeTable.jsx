const TimeTable = ({selectedMovie, selectedRegion, selectedLocation ,setSelectedTime}) => {

  return (
    <div className="border border-gray-400">
      <p className="bg-black text-white text-center w-72">영화</p>
      <div className="overflow-y-scroll max-h-[580px]">
        <span className="text-black py-1">
          {selectedMovie&& selectedMovie.schedules
            .filter(
              (item) =>
                item.region === selectedRegion &&
                item.location === selectedLocation
            )
            .map((filteredItem) =>
              filteredItem.times.map((time, index) => (
                <div key={index} className="pt-2">
                  <button className="border rounded-md px-2 py-1" onClick={()=>setSelectedTime(time.time)}>{time.time}</button>
                  <span className="pl-2">{time.availableSeats}석</span>
                </div>
              ))
            )}
        </span>
      </div>
    </div>
  );
}

export default TimeTable;