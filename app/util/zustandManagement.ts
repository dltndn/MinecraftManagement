import { UserInfo } from "./interface/compInterface";
import { create } from "zustand";

export const useUserInfo = create<UserInfo>((set) => ({
    isSignIn: false,
    setIsSignIn: (newPara: boolean) => set({ isSignIn: newPara }),
    isClickLogIn: false,
    setIsClickLogIn: (newPara: boolean) => set({ isClickLogIn: newPara }),
    userNameG: "000",
    setUserNameG: (newPara: string) => set({ userNameG: newPara }),
    userIdG: "0",
    setUserIdG: (newPara: string) => set({ userIdG: newPara }),
  }));