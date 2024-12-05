import { useEffect, useState } from "react";
import TopBar from "../Components/TopBar";

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
      <TopBar/>
    <div>
      <h2>이벤트</h2>
      {events.map((event) => (
        <div key={event.id}>
          <div className={`mt-3 flex flex-col justify-between border text-center rounded-lg cursor-pointer ${selected === event.id - 1 ? "border-black" : "border-gray-300"
            }`} onMouseEnter={() => SelectedEvent(event.id - 1)}>
            <h3 >{event.title}</h3>
            <div>
              {event.tag.map((tag, index) => (
                <span className="border rounded-lg bg-gray-300" key={index}>#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
export default Event;