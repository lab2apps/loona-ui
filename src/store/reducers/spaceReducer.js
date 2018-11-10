import { SpaceGetActionType } from '../actions/spaceActions';

export type SpaceState = {
  space: any;
}

const initialState: SpaceState = {
  fetching: true,
  space: null,
};

export const spaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SpaceGetActionType.FETCHING: {
      return {
        ...state,
        fetching: true,
      };
    }

    case SpaceGetActionType.SUCCESS: {
      return {
        ...state,
        space: action.payload.data,
        fetching: false,
      };
    }

    case SpaceGetActionType.FAILURE: {
      return {
        ...state,
        fetching: false,
      };
    }

    default: {
      return state;
    }
  }
};
