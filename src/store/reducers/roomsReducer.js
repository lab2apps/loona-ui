import { RoomActionType } from '../actions/roomActions';

export type RoomsState = {
  rooms: any[];
  fetching: boolean;
}

const initialState: RoomsState = {
  rooms: null,
  fetching: false,
};

export const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RoomActionType.FETCHING: {
      return {
        ...state,
        fetching: true,
        rooms: [],
      };
    }


    case RoomActionType.SUCCESS: {
      return {
        ...state,
        rooms: action.payload.data,
        fetching: false,
      };
    }

    default: {
      return state;
    }
  }
};
