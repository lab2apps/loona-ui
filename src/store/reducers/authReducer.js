import { AuthActionType } from '../actions/authActions';

export type AuthState = {
  token?: string;
};

const initialState: AuthState = {};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionType.SUCCESS: {
      return {
        ...state,
        token: action.payload.token,
      };
    }

    default: {
      return state;
    }
  }
};
