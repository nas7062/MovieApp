import { useEffect, useState } from "react";

const EventBanner = () => {
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
        <div className="mx-auto max-w-screen-md mt-20 h-96">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold ">이벤트</h2>
                <button className="px-2 py-1 bg-black text-white rounded mt-1 mr-1">전체보기 &gt;</button>
            </div>
            <div>
                {events.length > 0 && selected >= 0 && (
                    <div className="rounded-lg p-4 h-96 w-4/6 float-left ">
                        <img
                            className="w-full h-72  rounded-lg mt-2"
                            src={events[selected].image}
                            alt={events[selected].title}
                        />
                        <div className="text-center">
                            <h3 className="text-lg font-bold ">{events[selected].title}</h3>
                            {events[selected].tag.map((tag, index) => (
                                <span className="border rounded-lg bg-gray-300 mr-3" key={index}>#{tag}</span>
                            ))}
                        </div>
                    </div>
                )}
                <div className="float-right mt-4 w-64 ">
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
        </div>
    );
}

export default EventBanner;