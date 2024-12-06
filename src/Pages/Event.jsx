import { useEffect, useState } from "react";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";

const Event = () => {
  const [selected, setSelected] = useState(0);
  const [events, setEvents] = useState([]);
  const fetchEvents = async () => {
    try {
      const response = await fetch('/data/Event.json');
      const data = await response.json();
      setEvents(data);

    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const SelectedEvent = (index) => {
    setSelected(index);
  }
  return (
    <div>
      <TopBar />
      <div className="w-3/4 mt-32 ml-96">
        <h2 className="text-3xl">이벤트</h2>
        {events.map((event) => (
          <div key={event.id} className="inline-block">
            <div className={`mr-4 mt-3 w-60 h-96 flex flex-col justify-between border text-center rounded-lg cursor-pointer ${selected === event.id - 1 ? "border-black" : "border-gray-300"
              }`} onMouseEnter={() => SelectedEvent(event.id - 1)}>
              <div className="flex flex-col w-60">
                <img src={event.image} alt={event.title} className="w-60 h-80" />
                <h3>{event.title}</h3>
                <div>
                  {event.tag.map((tag, index) => (
                    <span className="border rounded-lg bg-gray-300" key={index}>#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
export default Event;