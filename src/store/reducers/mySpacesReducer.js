import { SpaceMyActionType } from '../actions/spaceActions';

export type MySpacesState = {
  spaces: any[];
}

const initialState: MySpacesState = {
  spaces: [],
};

export const mySpacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SpaceMyActionType.SUCCESS: {
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
