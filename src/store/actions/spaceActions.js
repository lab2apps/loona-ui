import type { ActionType } from '../../utils/actionType';
import { actionType } from '../../utils/actionType';
import { SpaceApiService } from '../../services/SpaceApiService';

export const SpaceActionType: ActionType       = actionType('space');
export const SpaceMyActionType: ActionType       = actionType('space-my');
export const SpaceGetActionType: ActionType    = actionType('space-get');
export const SpaceCreateActionType: ActionType = actionType('space-create');
export const SpaceUpdateActionType: ActionType = actionType('space-update');
export const SpaceDeleteActionType: ActionType = actionType('space-delete');

export const getMySpaces = (filter) => {
  return (dispatch) => {
    dispatch({
      type: SpaceMyActionType.FETCHING,
    });

    return SpaceApiService.getMy({ filter })
      .then(data => {
        dispatch({
          type: SpaceMyActionType.SUCCESS,
          payload: {
            data,
          }
        });
      })
      .catch((e) => {
        dispatch({
          type: SpaceMyActionType.FAILURE,
        });

        throw e;
      });
  };
};

export const getSpaces = (filter) => {
  return (dispatch) => {
    dispatch({
      type: SpaceActionType.FETCHING,
    });

    return SpaceApiService.getAll({ filter })
      .then(data => {
        dispatch({
          type: SpaceActionType.SUCCESS,
          payload: {
            data,
          }
        });
      })
      .catch((e) => {
        dispatch({
          type: SpaceActionType.FAILURE,
        });

        throw e;
      });
  };
};

export const getSpace = (id, fetching) => {
  return (dispatch) => {
    if (fetching) {
      dispatch({
        type: SpaceGetActionType.FETCHING,
      });
    }

    return SpaceApiService.get(id)
      .then(data => {
        dispatch({
          type: SpaceGetActionType.SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch(e => {
        dispatch({
          type: SpaceGetActionType.FAILURE,
        });

        throw e;
      });
  };
};

export const createSpace = (data) => {
  return (dispatch) => {
    dispatch({
      type: SpaceCreateActionType.FETCHING,
    });

    return SpaceApiService.create(data)
      .then((data) => {
        dispatch({
          type: SpaceCreateActionType.SUCCESS,
          payload: {
            data,
          },
        });

        return data;
      })
      .catch((e) => {
        dispatch({
          type: SpaceCreateActionType.FAILURE,
        });

        throw e;
      });
  };
};

export const updateSpace = (id, data) => {
  return (dispatch) => {
    dispatch({
      type: SpaceUpdateActionType.FETCHING,
    });

    return SpaceApiService.update(id, data)
      .then((data) => {
        dispatch({
          type: SpaceUpdateActionType.SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: SpaceUpdateActionType.FAILURE,
        });

        throw e;
      });
  };
};

export const removeSpace = (id) => {
  return (dispatch) => {
    dispatch({
      type: SpaceDeleteActionType.FETCHING,
    });

    return SpaceApiService.remove(id)
      .then((data) => {
        dispatch({
          type: SpaceDeleteActionType.SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: SpaceDeleteActionType.FAILURE,
        });

        throw e;
      });
  };
};

export const querySpaces = ({queryString}) => {
  return (dispatch) => {
    dispatch({
      type: SpaceActionType.FETCHING,
    });

    return SpaceApiService.query(queryString)
      .then(data => {
        dispatch({
          type: SpaceActionType.SUCCESS,
          payload: {
            data,
          }
        });
      })
      .catch((e) => {
        dispatch({
          type: SpaceActionType.FAILURE,
        });

        throw e;
      });
  };
};

