import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";

interface NoticeProps {
  id:number;
  title:string;
  content:string;
  category:string;
}
const NoticeDetail = () => {
  const { id } = useParams<{id: string }>();
  const [notice, setNotice] = useState<NoticeProps | null>(null);
  const navigate = useNavigate();
  const fetchNoticeDetail = async () => {
    try {
      const response = await fetch("/data/Notice.json");
      const data = await response.json();
      const foundNotice = data.find((item:NoticeProps) => item.id === Number(id));
      if (foundNotice) {
        setNotice(foundNotice);
      } else {
        console.error("Notice not found");
      }
    } catch (error) {
      console.error("Error fetching notice:", error);
    }
  };

  useEffect(() => {
    fetchNoticeDetail();
  }, [id]);
  const CatalogClick =() => {
    navigate('/service');
  }
  if(!notice) return;
  return (
    <div>
      <TopBar />
      <div className="w-2/5 mx-auto mt-32" >
      <h2 className="text-3xl mb-4">자주찾는 질문</h2>
        <div className="bg-gray-300">
          <h1 className="text-xl font-bold">{notice.title}</h1>
          <p className="text-sm ">{notice.category}</p>
        </div>
        <p className="mt-4">{notice.content}</p>
        <button className="bg-black text-white px-2 py-1 float-right" onClick={()=>CatalogClick()}>목록</button>
      </div>
      <Footer/>
    </div>
  );
}
export default NoticeDetail;