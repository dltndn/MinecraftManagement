"use client";
import { useUserInfo } from "../page";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const { setIsSignIn } = useUserInfo();

  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [quizAnswer, setQuizAnswer] = useState<string>("");

  const router = useRouter();

  const handleUsernameChange = (event: any) => {
    setUserName(event.target.value);
  };

  const handleUserIdChange = (event: any) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handlePasswordChkChange = (event: any) => {
    setPasswordCheck(event.target.value);
  };

  const handleQAnsChange = (event: any) => {
    setQuizAnswer(event.target.value);
  };

  const handleSignUp = (event: any) => {
    let isSuccess: boolean;
    event.preventDefault();
    // 회원가입 로직 구현
    if (quizAnswer === process.env.NEXT_PUBLIC_ANS_WORD) {
      isSuccess = true
    } else {
      isSuccess = false;
    }

    // 성공 여부
    if (isSuccess) {
      alert("가입에 성공했습니다.");
      router.push("/");
    } else {
      resetInputData()
      alert("가입에 실패했습니다. 다시 해주세요.");
    }
  };

  const resetInputData = () => {
    setPassword("");
    setPasswordCheck("");
    setQuizAnswer("");
  };

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_ANS_WORD)
    return () => {
      resetInputData()
    };
  }, []);

  return (
    <div>
      <div>회원 가입</div>
      <div onClick={() => router.push("/")}>홈버튼</div>
      <br />
      <div>성함</div>
      <input type="text" value={userName} onChange={handleUsernameChange} />
      <br />
      <div>아이디</div>
      <input
        type="text"
        value={userId}
        onChange={handleUserIdChange}
        maxLength={14}
      />
      <br />
      <div>비밀번호(4자리만)</div>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        maxLength={4}
      />
      <div>
        비밀번호 확인<div>|비밀번호 일치 여부</div>
      </div>
      <input
        type="password"
        value={passwordCheck}
        onChange={handlePasswordChkChange}
        maxLength={4}
      />
      <br />
      <div>이 웹페이지의 제작자 이름은?</div>
      <input type="text" value={quizAnswer} onChange={handleQAnsChange} />
      <br />
      <button onClick={handleSignUp}>회원가입하기</button>
    </div>
  );
};

export default SignUpPage;
