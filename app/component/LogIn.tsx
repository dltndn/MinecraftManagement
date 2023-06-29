import { useUserInfo } from "../util/zustandManagement";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_DB_URL

const LogIn = () => {
  const { setIsSignIn, setIsClickLogIn, setUserNameG } = useUserInfo();

  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleUserIdChange = (event: any) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSignUp = (event: any) => {
    event.preventDefault();
    router.push("/signUp");
  };

  const handleLogIn = async () => {
    const requestData = {
      user_id: userId,
      user_password: password
    };
  
    await axios.post(`${url}/api/checkUser`, requestData)
      .then((response) => {
        // 서버로부터 받은 응답 데이터 처리
        if (response.data.result !== null) {
          setIsSignIn(true);
          setIsClickLogIn(false);
          setUserNameG(response.data.result);
        } else {
          alert("로그인 실패...")
          setUserId("")
          setPassword("")
        }
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    return () => {
      setPassword("");
      setIsClickLogIn(false);
    };
  }, []);

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <HomeButton onClick={() => setIsClickLogIn(false)}>
        <FiHome size={24} />
      </HomeButton>
      <StyledInput
        type="text"
        value={userId}
        onChange={handleUserIdChange}
        placeholder="아이디"
      />
      <StyledInput
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="비밀번호"
      />
      <ButtonContainer>
        <SignUpButton onClick={handleSignUp}>회원가입</SignUpButton>
        <LogInButton onClick={handleLogIn}>로그인</LogInButton>
      </ButtonContainer>
    </LoginContainer>
  );
};

export default LogIn;

const LoginContainer = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #333300;
  border-radius: 10px;
  padding: 20px;
  height: 15em;
  width: 19em;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const HomeButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
  padding: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  color: #fff;
  background-color: ${(props) => props.theme.backgroundColor};
  cursor: pointer;
`;

const SignUpButton = styled(Button)`
  background-color: #fca311;
`;

const LogInButton = styled(Button)`
  background-color: #14213d;
`;
