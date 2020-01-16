import { Plugins } from '@capacitor/core';

import {
    AuthActionTypes,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from "./types";
  
import { ThunkAction } from "redux-thunk";
import { AppState } from "../";

const { Storage } = Plugins;

 export const login = (callback: any = noop): ThunkAction<
    void,
    AppState,
    null,
    AuthActionTypes
> => dispatch => {
    (async function(){
        await Storage.set({ key: 'isSignIn', value: 'true' })
        const storage = await Storage.get({ key: 'isSignIn' })
        console.log('storage', storage)
        dispatch(loginSuccess());
        callback();
    })()
};
  
export const loginSuccess = (): AuthActionTypes => ({
    type: LOGIN_SUCCESS
});

export const logout = (callback: any = noop): ThunkAction<
    void,
    AppState,
    null,
    AuthActionTypes
> => dispatch => {
    (async function(){
        await Storage.clear()
        const storage = await Storage.get({ key: 'isSignIn' })
        console.log('storage', storage)
        dispatch(logoutSuccess());
        callback()
    })()
};

export const logoutSuccess = (): AuthActionTypes => ({
    type: LOGOUT_SUCCESS
});

export const authCheckStatus = (callback: any = noop): ThunkAction<
    void,
    AppState,
    null,
    AuthActionTypes
  > => dispatch => {
    (async function(){
        const user = await Storage.get({ key: 'isSignIn' })
        if (user && user.value) {
            console.log('user', user)
            dispatch(loginSuccess());
            callback()
          }
    })()
  };
  
export type AuthCheckStatusType = typeof authCheckStatus;

function noop() {}