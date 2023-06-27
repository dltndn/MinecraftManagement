'use client';
import { useUserInfo } from "../page";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const { setIsSignIn } = useUserInfo()

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [quizAnswer, setQuizAnswer] = useState<string>("");

  const router = useRouter();


  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handlePasswordChkChange = (event: any) => {
    setPasswordCheck(event.target.value)
  }

  const handleQAnsChange = (event: any) => {
    setQuizAnswer(event.target.value)
  }

  const handleSignUp = (event: any) => {
    let isSuccess: boolean
    event.preventDefault();
    // 회원가입 로직 구현

    // 성공 여부
    isSuccess = true
    if (isSuccess) {
        router.push("/")
    } else {
        alert("가입에 실패했습니다. 다시 해주세요")
    }
  };

  return (
    <div>
      <div>회원 가입</div>
      <div onClick={() => router.push("/")}>홈버튼</div>
      <br />
      <div>아이디</div>
      <input type="text" value={username} onChange={handleUsernameChange} />
      <br />
      <div>비밀번호</div>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <div>비밀번호 확인</div>
      <input type="password" value={passwordCheck} onChange={handlePasswordChkChange} />
      <br />
      <div>이 웹페이지의 제작자 이름은?</div>
      <input type="text" value={quizAnswer} onChange={handleQAnsChange} />
      <br />
      <button onClick={handleSignUp}>회원가입하기</button>
    </div>
  );
};

export default SignUpPage;
