import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";

interface InquireProps {
  displayName: string;
  category: string;
  date: string;
  title: string;
  content: string;
}
const InquireDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [inquiry, setInquiry] = useState<InquireProps | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchInquiryDetail = async () => {
      try {
        const docRef = doc(db, "inquiries", id);
        console.log(docRef);
        const docSnap: DocumentData = await getDoc(docRef);

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
          <span>작성일: {inquiry.date}</span>
        </div>
        <div className="ml-10">
          <p>제목: {inquiry.title}</p>
          <p className="mt-2">내용: {inquiry.content}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InquireDetail;
