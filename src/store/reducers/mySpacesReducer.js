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
      const ids = new Set(action.payload.data.map((item) => item.uuid));

      console.log(ids);

      return {
        ...state,
        spaces: action.payload.data.filter(item => {
          if (ids.has(item.uuid)) {
            ids.delete(item.uuid);

            return true;
          }

          return false;
        }),
      };
    }

    default: {
      return state;
    }
  }
};
