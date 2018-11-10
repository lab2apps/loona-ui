import { SpaceActionType } from '../actions/spaceActions';

export type AllSpacesState = {
  spaces: any[];
}

const initialState: AllSpacesState = {
  spaces: [],
};

export const allSpacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SpaceActionType.SUCCESS: {
      return {
        ...state,
        spaces: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
};
