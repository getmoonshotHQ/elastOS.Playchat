export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export interface AuthState {
  isAuthenticated: boolean;
}

interface LoginAction {
  type: typeof LOGIN;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export type AuthActionTypes =
  | LoginAction
  | LoginSuccessAction
  | LogoutAction
  | LogoutSuccessAction