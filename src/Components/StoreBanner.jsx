import { useEffect, useState } from "react";
import StoreCard from "./StoreCard";

const StoreBanner = () => {
    const [pack, setPack] = useState([]);
    const [ticket, setTicket] = useState([]);
    const [gift, setGift] = useState([]);

    const fetchData = async (url, setState) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setState(data);
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
        }
    };
    useEffect(() => {
        fetchData('/data/Pack.json', setPack);
        fetchData('/data/Ticket.json', setTicket);
        fetchData('/data/Gift.json', setGift);
    }, []);
    return (
        <div className="flex  justify-center items-center mt-20 ">
            <StoreCard data={pack} name="패키지" />
            <StoreCard data={ticket} name="영화 관람권" />
            <StoreCard data={gift} name="기프트 카드" />
        </div>
    );
}
export default StoreBanner;