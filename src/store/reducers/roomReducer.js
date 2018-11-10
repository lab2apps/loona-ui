import { RoomGetActionType } from '../actions/roomActions';

export type RoomState = {
  room: any;
  fetching: boolean;
}

const initialState: RoomState = {
  room: null,
  fetching: false,
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case RoomGetActionType.FETCHING: {
      return {
        ...state,
        fetching: true,
      };
    }

    case RoomGetActionType.SUCCESS: {
      return {
        ...state,
        room: action.payload.data,
        fetching: false,
      };
    }

    case RoomGetActionType.FAILURE: {
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
