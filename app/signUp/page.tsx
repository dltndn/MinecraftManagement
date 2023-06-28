"use client";
import { useUserInfo } from "../page";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { FiHome, FiCheckCircle, FiXCircle } from "react-icons/fi";

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
      isSuccess = true;
    } else {
      isSuccess = false;
    }

    // 성공 여부
    if (isSuccess) {
      alert("가입에 성공했습니다.");
      router.push("/");
    } else {
      resetInputData();
      alert("가입에 실패했습니다. 다시 해주세요.");
    }
  };

  const resetInputData = () => {
    setPassword("");
    setPasswordCheck("");
    setQuizAnswer("");
  };

  useEffect(() => {
    return () => {
      resetInputData();
    };
  }, []);

  return (
    <Container>
      <ButtonContainer>
        <Title>회원 가입</Title>
        <HomeButton onClick={() => router.push("/")}>
          <FiHome size={24} />
        </HomeButton>
      </ButtonContainer>
      <Field>
        <Label>성함</Label>
        <Input type="text" value={userName} onChange={handleUsernameChange} />
      </Field>
      <Field>
        <Label>아이디</Label>
        <Input
          type="text"
          value={userId}
          onChange={handleUserIdChange}
          maxLength={14}
        />
      </Field>
      <Field>
        <Label>비밀번호(4자리만)</Label>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          maxLength={4}
        />
      </Field>
      <Field>
        <Label>
          비밀번호 확인
          <PasswordCheck>
            {password === passwordCheck ? <FiCheckCircle size={12} /> : <FiXCircle size={12} />}
          </PasswordCheck>
        </Label>
        <Input
          type="password"
          value={passwordCheck}
          onChange={handlePasswordChkChange}
          maxLength={4}
        />
      </Field>
      <Field>
        <SpecialLabel>이 웹페이지의 제작자 이름은?</SpecialLabel>
        <Input type="text" value={quizAnswer} onChange={handleQAnsChange} />
      </Field>
      <SignUpButton onClick={handleSignUp}>회원가입하기</SignUpButton>
    </Container>
  );
};

export default SignUpPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-bottom: 1em;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const HomeButton = styled.div`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const Field = styled.div`
  margin-top: 20px;
`;

const Label = styled.div`
  margin-bottom: 5px;
`;

const SpecialLabel = styled.div`
  margin-bottom: 5px;
  font-size: small;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const PasswordCheck = styled.span`
  margin-left: 5px;
  color: "green";
`;

const SignUpButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  color: #fff;
  background-color: #14213d;
  cursor: pointer;
`;
