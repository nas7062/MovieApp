import React, { useEffect, useState } from "react";
import StoreCard from "./StoreCard";

interface StoreProps {
    id: number,
    name: string,
    image: string,
    price: number
}
const StoreBanner = () => {
    const [pack, setPack] = useState<StoreProps[]>([]);
    const [ticket, setTicket] = useState<StoreProps[]>([]);
    const [combo, setCombo] = useState<StoreProps[]>([]);

    const fetchData = async (url: string, setState: React.Dispatch<React.SetStateAction<StoreProps[]>>) => {
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