import { SpaceGetActionType } from '../actions/spaceActions';

export type SpaceState = {
  space: any;
}

const initialState: SpaceState = {
  space: {},
};

export const spaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SpaceGetActionType.SUCCESS: {
      return {
        ...state,
        space: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
};
