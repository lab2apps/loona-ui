import { VkGetUserAction } from '../actions/vkActions';

export type UserState = {
  id?: number;
};

const initialState: UserState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case VkGetUserAction.SUCCESS: {
      return {
        ...state,
        ...action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
};
