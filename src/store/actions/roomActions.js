import type { ActionType } from '../../utils/actionType';
import { actionType } from '../../utils/actionType';
import { RoomApiService } from '../../services/RoomApiService';

export const RoomActionType: ActionType       = actionType('room');
export const RoomGetActionType: ActionType    = actionType('room-get');
export const RoomCreateActionType: ActionType = actionType('room-create');
export const RoomUpdateActionType: ActionType = actionType('room-update');
export const RoomDeleteActionType: ActionType = actionType('room-delete');

export const getRooms = (filter) => {
  return (dispatch) => {
    dispatch({
      type: RoomActionType.FETCHING,
    });

    return RoomApiService.getAll({ filter })
      .then(data => {
        dispatch({
          type: RoomActionType.SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: RoomActionType.FAILURE,
        });

        throw e;
      });
  };
};

export const getRoom = (id) => {
  return (dispatch) => {
    dispatch({
      type: RoomGetActionType.FETCHING,
    });

    return RoomApiService.get(id)
      .then(data => {
        dispatch({
          type: RoomGetActionType.SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch(e => {
        dispatch({
          type: RoomGetActionType.FAILURE,
        });

        throw e;
      });
  };
};

export const createRoom = (data) => {
  return (dispatch) => {
    dispatch({
      type: RoomCreateActionType.FETCHING,
    });

    return RoomApiService.create(data)
      .then((data) => {
        dispatch({
          type: RoomCreateActionType.SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: RoomCreateActionType.FAILURE,
        });

        throw e;
      });
  };
};

export const updateRoom = (id, data) => {
  return (dispatch) => {
    dispatch({
      type: RoomUpdateActionType.FETCHING,
    });

    return RoomApiService.update(id, data)
      .then((data) => {
        dispatch({
          type: RoomUpdateActionType.SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: RoomUpdateActionType.FAILURE,
        });

        throw e;
      });
  };
};

export const removeRoom = (id) => {
  return (dispatch) => {
    dispatch({
      type: RoomDeleteActionType.FETCHING,
    });

    return RoomApiService.remove(id)
      .then((data) => {
        dispatch({
          type: RoomDeleteActionType.SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: RoomDeleteActionType.FAILURE,
        });

        throw e;
      });
  };
};

