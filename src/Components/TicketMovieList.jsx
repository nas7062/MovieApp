const TicketMoviList = ({movies}) => {
  
  return (
    <div className="border border-gray-400">
      <p className="bg-black text-white text-center w-72">영화</p>
      <div className="overflow-y-scroll max-h-[580px]">
        {movies.map((movie) => (
          <div key={movie.id} className="mt-5 max-w-72">
            <span className={`text-white py-1 ${movie.adult ? "bg-green-500" : "bg-red-500"}`}>{movie.adult ? '19' : 'ALL'}</span>
            <span className="ml-3">{movie.title.length > 16 ? movie.title.slice(0, 16) + ' ...' : movie.title}</span>
          </div>
        ))
        }
      </div>
    </div>
  );
}
export default TicketMoviList;