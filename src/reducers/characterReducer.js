import { ActionTypes } from '../actions/types'
import { updateAttribute, updateSkillSpending } from '../handlers/attributesActionHandler'


const characterReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.MODIFY_ATTRIBUTE_POINTS:
      const { idForAttribute, attributeName, additionalValue } = action.payload;
      return updateAttribute(state, idForAttribute, attributeName, additionalValue);
    case ActionTypes.MODIFY_SKILL_SPENDING:
      const { idForSkillSpending, skillName, additionalSkillPoints } = action.payload;
      return updateSkillSpending(state, idForSkillSpending, skillName, additionalSkillPoints);
    case ActionTypes.UPDATE_STATE:
      return action.payload
    default:
      return state;
  }
};


export default characterReducer;

