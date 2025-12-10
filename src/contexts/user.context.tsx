"use client";

// Hooks
import { createContext, useContext, useReducer } from "react";

// Types
import type { ReactNode } from "react";

type UserStateType = {
    userName: string;
};

type UserActionType =
    | { type: "SET_NAME"; payload: string };

type UserContextValueType = {
    userName: string;
    setUserName: (userName: string) => void;
};

type UserContextProviderPropsType = {
    children: ReactNode;
};

const initialState: UserStateType = {
    userName: ""
};

function userReducer(state: UserStateType, action: UserActionType): UserStateType {
    switch (action.type) {
        case "SET_NAME":
            return { ...state, userName: action.payload };
        default:
            return state;
    }
}

const UserContext = createContext<UserContextValueType | undefined>(undefined);

export function UserProvider({ children }: UserContextProviderPropsType) {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const ctxValue: UserContextValueType = {
        userName: state.userName,
        setUserName(userName: string) {
            dispatch({ type: "SET_NAME", payload: userName });
        }
    }

    return (
        <UserContext.Provider value={ctxValue}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used inside UserProvider");

    return ctx;
}