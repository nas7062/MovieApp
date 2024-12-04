import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { db } from "../firebase";
import TopBar from "../Components/TopBar";

const InquireDetail = () => {

  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);

  useEffect(() => {
    const fetchInquiryDetail = async () => {
      try {
        const docRef = doc(db, "inquiries", id);
        console.log(docRef);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setInquiry(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching inquiry detail: ", error);
      }
    };

    fetchInquiryDetail();
  }, [id]);
  if (!inquiry) {
    return <div className="text-center">Loading...</div>;
  }
  return (
    <div>
      <TopBar />
      <div className="w-1/4 mx-auto bg-gray-200 h-80 mt-32">
        <h2 className="text-center text-2xl">문의 상세</h2>
        <div className="p-4 flex justify-around">
          <span>작성자: {inquiry.displayName}</span>
          <span>문의유형: {inquiry.category}</span>
          <sapn>작성일: {inquiry.date}</sapn>
        </div>
        <div className="ml-10">
          <p >제목: {inquiry.title}</p>
          <p className="mt-2">내용: {inquiry.content}</p>
        </div>
      </div>
    </div>
  );
}

export default InquireDetail