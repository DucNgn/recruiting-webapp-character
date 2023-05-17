import { ActionTypes } from './types';

export const modifyAttributePoint = (idForAttribute, attributeName, additionalValue) => {
  return {
    type: ActionTypes.MODIFY_ATTRIBUTE_POINTS,
    payload: {
      idForAttribute,
      attributeName,
      additionalValue
    }
  }
}

export const modifySkillSpending = (idForSkillSpending, skillName, additionalSkillPoints) => {
  return {
    type: ActionTypes.MODIFY_SKILL_SPENDING,
    payload: {
      idForSkillSpending,
      skillName,
      additionalSkillPoints
    }
  }
}

export const updateStates = (states) => {
  return {
    type: ActionTypes.UPDATE_STATE,
    payload: states
  }
}
