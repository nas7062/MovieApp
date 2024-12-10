import { useEffect, useState } from "react";
import StoreCard from "./StoreCard";

const StoreBanner = () => {
    const [pack, setPack] = useState([]);
    const [ticket, setTicket] = useState([]);
    const [combo, setCombo] = useState([]);

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
        fetchData('/data/Combo.json', setCombo);
    }, []);
    return (
        <div className="flex  justify-center items-center mt-20 ">
            <StoreCard data={pack} name="패키지" />
            <StoreCard data={ticket} name="영화 관람권" />
            <StoreCard data={combo} name="콤보" />
        </div>
    );
}
export default StoreBanner;