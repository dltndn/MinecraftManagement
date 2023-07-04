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

export interface SetUsing_db {
    user_name: string;
    usage: string;
}

export interface UserSignUp_db extends User_db{
    user_name: string;
}

export interface GuestBook_db {
    book_id: string;
}