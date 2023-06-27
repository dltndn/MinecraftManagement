'use client';
import Link from "next/link"
import { useState, useEffect } from "react";
import { create } from "zustand"
import { UserInfo } from "./util/interface/compInterface";
import LogIn from "./component/LogIn";

export const useUserInfo = create<UserInfo>((set) => ({
  isSignIn: false,
  setIsSignIn: (newPara: boolean) => set({isSignIn: newPara}),
  isClickLogIn: false,
  setIsClickLogIn: (newPara: boolean) => set({isClickLogIn: newPara})
}));

export default function Home() {
  const { isSignIn } = useUserInfo()

  const [isClickLogIn, setIsClickLogIn] = useState<boolean>(false)

  const userName = "000"

  useEffect(() => {

  }, [isSignIn])

  return (
    <>
      <h1>마크 계정 공유</h1>
      {isSignIn ? (<><div>{userName}님 하이</div><div>로그아웃</div></>):(<><div>로그인 먼저 해주세요</div><div>로그인</div></>)}
      
      <br></br>
      <div>사용 여부</div>
      <div>{"<---"}000님</div>
      <br></br>
      <div>사용기록</div>
      <div>방명록</div>
      <Link href="/signUp">회원가입</Link>
      {isClickLogIn ? (<LogIn />):(<></>)}
    </>
  )
}
