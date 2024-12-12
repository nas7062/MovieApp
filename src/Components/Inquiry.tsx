import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, db } from "../firebase";

const Inquiry = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  }
  console.log(category, currentUser);
  const categoryList = ['문의', '불만', '칭찬', '제안', '분실물'];
  const ChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const ChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }
  const SubmitHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!category || !title || !content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    if (!currentUser)
      return;
    try {
      const inquiriesCollection = collection(db, "inquiries"); // Firestore 컬렉션 이름 설정
      await addDoc(inquiriesCollection, {
        userId: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        category,
        title,
        content,
        date: (`${new Date().getFullYear()}년${new Date().getMonth() + 1}월${new Date().getDate()}일`).toLocaleString(),
      });

      alert("문의가 성공적으로 등록되었습니다.");
      setCategory("");
      setTitle("");
      setContent("");
      navigate('/');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("문의 등록 중 오류가 발생했습니다.");
    }
  };
  const handleCancel = () => {
    setCategory('');
    setTitle('');
    setContent('');
    navigate(-1); 
  };
  return (

    <div>
      {currentUser ?
        <div className="w-2/5 mx-auto mt-4">
          <h2 className="text-3xl">1:1 문의</h2>
          <span className="text-lg w-1/5">자주찾는 질문에서 원하는 답변을 찾지 못하셨군요</span>
          <span className="text-lg">불편사항이나 문의사항을 남겨주시면 최대한 신속하게 답변 드리겠습니다.</span>
          <div className="py-2 border-y border-black text-lg flex justify-around">
            <span className="mr-10">이름 :{currentUser.displayName}</span>
            <span>이메일 : {currentUser.email ? `${currentUser.email.slice(0, 1)}**${currentUser.email.slice(3)}` : " "}</span>
          </div>
          <div className="py-2 border-y border-black text-lg mr-10">
            <label htmlFor="input" >
              문의유형
              {categoryList.map((category,index) => (
                <>
                  <input
                    type="radio"
                    id="input"
                    value={category}
                    name="input"
                    onChange={categoryHandler}
                    className="ml-6"
                    key={index}
                  />{category}
                </>
              ))}
            </label>
          </div>
          <div className="py-2 border-y border-black">
            <label htmlFor="title">
              제목
              <input className="border border-black rounded-md ml-10 w-3/4" type="text" name="title" value={title} id="title" onChange={ChangeTitle} />
            </label>
          </div>
          <div className="py-2 border-y border-black">
            <label htmlFor="content " className="flex flex-col">
              <span>내용</span>
              <textarea className="border border-black rounded-md ml-10 w-3/4 h-32 " value={content} name="content" id="content" onChange={ChangeContent} />
            </label>
          </div>
          <div className="mt-4">
            <button onClick={handleCancel} className="float-left border border-black rounded-md px-3 py-1">취소</button>
            <button onClick={SubmitHandler} className="float-right bg-red-500 text-white  rounded-md px-3 py-1">등록하기</button>
          </div>
        </div>
        : <div className="text-center mt-10">로그인 해주세요...</div>
      }
    </div>

  );
}

export default Inquiry;