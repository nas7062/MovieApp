import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface NoticeProps {
  id: number;
  category: string;
  title: string;
  views: number;
}
const Notice = () => {
  const [notice, setNotice] = useState<NoticeProps[]>([]);
  const navigate = useNavigate();
  const fetchNotice = async () => {
    try {
      const response = await fetch("/data/Notice.json");
      const data: NoticeProps[] = await response.json();
      const savedViews: Record<number, number> = (() => {
        const stored = localStorage.getItem("noticeViews");
        return stored ? JSON.parse(stored) : {};
      })();
      console.log(savedViews);
      const updatedData = data.map((item) => ({
        ...item,
        views: savedViews[item.id] || item.views,
      }));

      setNotice(updatedData);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };
  const handleClick = async (id: number) => {
    await updateViews(id);
    navigate(`/notice/${id}`);
  };
  const updateViews = (id: number) => {
    setNotice((prevNotice) => {
      const updatedNotice = prevNotice.map((item) =>
        item.id === id ? { ...item, views: item.views + 1 } : item
      );

      const viewsToSave = updatedNotice.reduce((acc: Record<number, number>, item) => {
        acc[item.id] = item.views;
        return acc;
      }, {});

      localStorage.setItem("noticeViews", JSON.stringify(viewsToSave));

      return updatedNotice;
    });

  };

  useEffect(() => {
    fetchNotice();
  }, []);

  return (
    <div className="w-2/5 mx-auto">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-2 py-1 text-center text-sm w-12">번호</th>
            <th className="border border-gray-300 px-2 py-1 text-center text-sm w-48">구분</th>
            <th className="border border-gray-300 px-2 py-1 text-center text-sm w-48">제목</th>
            <th className="border border-gray-300 px-2 py-1 text-center text-sm w-12">조회수</th>
          </tr>
        </thead>
        <tbody>
          {notice.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-100"
              onClick={() => handleClick(item.id)}
            >
              <td className="border border-gray-300 px-2 py-1 text-center text-sm cursor-pointer">
                {item.id}
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center text-sm cursor-pointer">
                {item.category}
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center text-sm cursor-pointer">
                {item.title}
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center text-sm cursor-pointer">
                {item.views}
              </td>

            </tr>

          ))}
        </tbody>
      </table>
    </div >

  );
}
export default Notice;