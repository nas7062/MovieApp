const StoreCard = ({ data, name }) => {
    return (
        <div className="flex flex-col border border-gray-300 w-80 text-center h-96 mx-5">
            <div className="flex justify-between mx-5">
                <h3 className="text-xl font-bold">{name}</h3>
                <button className="border rounded-lg px-1 py-1 text-sm">더보기 &gt;</button>
            </div>
            <div>
                {data.map((pc) => (
                    <div className="flex mt-5 cursor-pointer">
                        <img src={pc.image} alt={pc.name} className="max-w-24 ml-2" />
                        <div className="flex flex-col mt-5 ml-10 font-bold">
                            <p>{pc.name}</p>
                            <p>{pc.price ? `${pc.price.toLocaleString()}원` : ''}</p>
                            <p>{pc.amount}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StoreCard;