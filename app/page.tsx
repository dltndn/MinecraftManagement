"use client";
import { useState, useEffect } from "react";
import { create } from "zustand";
import { UserInfo } from "./util/interface/compInterface";
import styled from "styled-components";
import Image from "next/image";

import LogIn from "./component/LogIn";

import axios from "axios"

const openIcon = require("./picture/openIcon.png");
const closedIcon = require("./picture/closedIcon.png");
const loadingIcon = require("./picture/loadingIcon.png");

export const useUserInfo = create<UserInfo>((set) => ({
  isSignIn: false,
  setIsSignIn: (newPara: boolean) => set({ isSignIn: newPara }),
  isClickLogIn: false,
  setIsClickLogIn: (newPara: boolean) => set({ isClickLogIn: newPara }),
  userNameG: "000",
  setUserNameG: (newPara: string) => set({ userNameG: newPara }),
}));

export default function Home() {
  const {
    isSignIn,
    setIsSignIn,
    isClickLogIn,
    setIsClickLogIn,
    userNameG,
    setUserNameG,
  } = useUserInfo();
  const [isUsingAccounnt, setIsUsingAccount] = useState<boolean | null>(null);
  const [connectedUserName, setConnectedUserName] = useState<string | null>(
    null
  ); 

  const getHasBeenUsed = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DB_URL}/api/hasBeenUsed`);
      if (response.data.result === null) {
        setIsUsingAccount(false);
      } else {
        setIsUsingAccount(true);
        setConnectedUserName(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHasBeenUsed()
  }, []);

  return (
    <>
      <Title>마크 계정 공유</Title>
      <LogInLogOut>
      {isSignIn ? (
        <>
          <LoginContainer>
          <div>{userNameG}님 Hi!</div>
          <LogOutButton
            onClick={() => {
              setIsSignIn(false);
              setUserNameG("");
            }}
          >
            로그아웃
          </LogOutButton>
          </LoginContainer>
        </>
      ) : (
        <>
          <LoginContainer>
          <LogInButton onClick={() => setIsClickLogIn(true)}>로그인</LogInButton>
          </LoginContainer>
        </>
      )}
      </LogInLogOut>
      <MiddleDiv>
      {isUsingAccounnt !== null ? (
        <>
          {isUsingAccounnt ? (
            <>
              <Image src={closedIcon} alt="사용중" width={200} />
              <div>
                {"<---"}
                {connectedUserName}님이 사용중
              </div>
            </>
          ) : (
            <>
              <Image src={openIcon} alt="사용x" width={200} />
              <div>아무도 사용 안하는 중</div>
            </>
          )}
        </>
      ) : (
        <>
          <Image src={loadingIcon} alt="로딩" width={200} />
        </>
      )}
      </MiddleDiv>
      <Container>
        <UsageHistory>
          <div>최근기록</div>
        </UsageHistory>

        <GuestBook>
          <div>방명록</div>
        </GuestBook>
      </Container>
      {isClickLogIn && (
        <Backdrop>
          <LogIn />
        </Backdrop>
      )}
    </>
  );
}

const Title = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 0.5em;
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 0.5em;
`;

const LogInLogOut = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const MiddleDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const UsageHistory = styled.div`
  flex: 1;
  margin-right: 20px;
  padding-left: 0.5em;
`;

const GuestBook = styled.div`
  flex: 1;
  border-left: 1px solid #ccc;
  padding-left: 0.5em;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  color: #fff;
  background-color: ${(props) => props.theme.backgroundColor};
  cursor: pointer;
`;

const LogInButton = styled(Button)`
  background-color: #14213d;
  margin-left: 1em;
`;

const LogOutButton = styled(Button)`
background-color: #323b4d;
margin-left: 1em;
`;
