import { useUserInfo } from "../page";
import { useState } from "react";
import { useRouter } from "next/router";

const LogIn = () => {
    const { setIsSignIn } = useUserInfo()

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSignUp = (event: any) => {
    event.preventDefault();
    // 회원가입 로직 구현
    router.push("/signUp")
  };

  const handleLogIn = () => {
    // 회원 여부 확인 로직
    setIsSignIn(true)    
  }

  return (
    <div>
      <div>마크 계정 공유</div>
      <div>홈버튼</div>
      <br />
      <div>아이디</div>
      <input type="text" value={username} onChange={handleUsernameChange} />
      <br />
      <div>비밀번호</div>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <br />
      <button onClick={handleSignUp}>회원가입</button>
      <button onClick={() => handleLogIn() }>로그인</button>
    </div>
  );
};

export default LogIn;
