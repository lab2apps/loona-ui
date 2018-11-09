const types = [];

export type ActionType = {
  FETCHING: string;
  SUCCESS: string;
  FAILURE: string;
};

export const actionType = (action: string, customActions): ActionType => {
  const actionType = action.toUpperCase();

  if (types.includes(actionType)) {
    throw new Error(`ActionType "${actionType}" already exists`);
  }

  types.push(action);

  const actionTypes: ActionType =  {
    SUCCESS: `${actionType}_SUCCESS`,
    FAILURE: `${actionType}_FAILURE`,
    FETCHING: `${actionType}_FETCHING`,
  };

  if (customActions) {
    customActions.forEach((customAction) => {
      const customActionType = customAction.toUpperCase();

      actionTypes[customActionType] = `${actionType}_${customActionType}`
    });
  }

  return actionTypes;
};
