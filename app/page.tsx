'use client';
import { useState, useEffect } from "react";
import { create } from "zustand"
import { UserInfo } from "./util/interface/compInterface";
import styled from "styled-components";

import LogIn from "./component/LogIn";

export const useUserInfo = create<UserInfo>((set) => ({
  isSignIn: false,
  setIsSignIn: (newPara: boolean) => set({isSignIn: newPara}),
  isClickLogIn: false,
  setIsClickLogIn: (newPara: boolean) => set({isClickLogIn: newPara}),
  userNameG: "000",
  setUserNameG: (newPara: string) => set({userNameG: newPara}),
}));

export default function Home() {
  const { isSignIn, setIsSignIn, isClickLogIn, setIsClickLogIn, userNameG, setUserNameG } = useUserInfo()
  const [isUsingAccounnt, setIsUsingAccount] = useState<boolean>(false)
  const [connectedUserName, setConnectedUserName] = useState<string | null>(null)

  useEffect(() => {
    // 계정 사용여부 체크 후
    setIsUsingAccount(true)
    setConnectedUserName("나나나")
  }, [])

  return (
    <>
      <h1>마크 계정 공유</h1>
      {isSignIn ? (<><div>{userNameG}님 하이</div><div onClick={() => {setIsSignIn(false); setUserNameG("")}}>로그아웃</div></>):(<><div>로그인 먼저 해주세요</div><div onClick={() => setIsClickLogIn(true)}>로그인</div></>)}
      
      <br></br>
      {isUsingAccounnt ? (<>시용중<div>{"<---"}{connectedUserName}님</div></>):(<>사용x</>)}
      <br></br>
      <Container>
        <UsageHistory>
          <div>사용기록</div>
        </UsageHistory>

        <GuestBook>
          <div>방명록</div>
        </GuestBook>
      </Container>
      {isClickLogIn && <Backdrop><LogIn /></Backdrop>}
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const UsageHistory = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const GuestBook = styled.div`
  flex: 1;
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
