export interface UserInfo {
    isSignIn: boolean;
    setIsSignIn: (data: boolean) => void;
    isClickLogIn: boolean;
    setIsClickLogIn: (data: boolean) => void;
    userNameG: string;
    setUserNameG: (data: string) => void;
}