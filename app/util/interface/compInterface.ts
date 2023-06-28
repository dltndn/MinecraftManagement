export interface UserInfo {
    isSignIn: boolean;
    setIsSignIn: (data: boolean) => void;
    isClickLogIn: boolean;
    setIsClickLogIn: (data: boolean) => void;
    userNameG: string;
    setUserNameG: (data: string) => void;
}

export interface User_db {
    user_id: string;
    user_password: string;
}