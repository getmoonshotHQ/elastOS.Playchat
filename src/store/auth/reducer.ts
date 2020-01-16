import {
  AuthState,
  AuthActionTypes,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from "./types";

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};