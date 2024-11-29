const MovieInfo = ({selectedMovie,selectedRegion,selectedLocation,selectedDated,selectedTime,seatSelect,ViewSeat }) =>{
 return(
    <div className=" mt-12 border border-gray-400 py-2 w-full bg-black">
          <div className="flex mx-48 text-white">
            <img
              className="w-32"
              src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
            />
            <span className="w-48 mx-4 mt-10">영화:{selectedMovie.title}</span>
            <div className="flex flex-col mt-10">
              <span>지역:{selectedRegion}</span>
              <span>극장:{selectedLocation}</span>
              <span>날짜:{selectedDated}</span>
              <span>시간:{selectedTime}</span>
            </div>
            <div className="text-4xl text-gray-500 mt-16 ml-8">
              <span>좌석선택 &gt;</span>
              <span>결제 &gt;</span>
            </div>
            <div>
              <button
                className={`text-xl border rounded-lg py-6 px-2 mt-10 ml-32 ${
                  seatSelect ? "bg-red-500" : "bg-gray-500"
                }`}
                onClick={()=>ViewSeat()}
               > 
                좌석선택
              </button>
            </div>
          </div>
        </div>
 );
}
export default MovieInfo