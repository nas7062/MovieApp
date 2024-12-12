const Footer = () => {
  return (
    <div className="bg-gray-100 h-96 mt-32 font-bold">
      <div className="mx-auto w-4/6 h-72 flex justify-evenly">
        <div className="w-72 mt-48">
          <p className="w-72">주소 : 인천광역시 서구 봉오재 1로 36 </p>
          <p>대표자 : 김민석</p>
          <p>전화번호 : 010-9314-7062</p>
          <p>이메일 : nas7062@naver.com</p>
        </div>
        <div className="mt-48 max-w-full">
          <p>Github : https://github.com/nas7062</p>
          <p className="">Notion : https://www.notion.so/897edf5e76e74ff6a585a68390a46062</p>
          <p>Velog : https://velog.io/@10012/posts</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;