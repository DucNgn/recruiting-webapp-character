import { SKILL_LIST, CLASS_LIST } from '../consts.js';
import { findModifierBySkillName } from '../helper.js';

export const updateSkillSpending = (state, id, skillName, additionValue) => {
  const newState = [...state];
  const characterIndex = state.findIndex((character) => character.id === id)
  const character = newState[characterIndex]

  // Update spending for the current skill
  character.skillsSpending[skillName] += additionValue

  // Update skill points for the current skill
  const modifier = findModifierBySkillName(skillName)
  character.skills[skillName] = character.skillsSpending[skillName] + character.modifiers[modifier]

  // Update total points
  return updateTotalPoints(newState, id)
}

export const updateAttribute = (state, id, attributeName, additionalValue) => {
  const newState = [...state];
  const characterIndex = state.findIndex((character) => character.id === id)
  const character = newState[characterIndex]

  // Update points for this attribute
  character.attributes[attributeName] += additionalValue

  // Update the modifier for this attribute
  const newModifierValue = Math.floor((character.attributes[attributeName] - 10) / 2)
  character.modifiers[attributeName] = newModifierValue

  // Update skill points
  const skillsToUpdate = SKILL_LIST.filter((skill) => skill.attributeModifier === attributeName);
  skillsToUpdate.map((skillName) => {
    character.skills[skillName] = character.skillsSpending[skillName] + character.modifiers[attributeName]
  })

  // Update valid class
  character.classes.Barbarian = checkValidClass(character.attributes, 'Barbarian')
  character.classes.Wizard = checkValidClass(character.attributes, 'Wizard')
  character.classes.Bard = checkValidClass(character.attributes, 'Bard')

  return updateTotalPoints(newState, id)
}

export const updateTotalPoints = (state, id) => {
  const newState = [...state];
  const characterIndex = state.findIndex((character) => character.id === id)
  const character = newState[characterIndex]
  const newTotalPoints = 10 + 4 * character.modifiers["Intelligence"] - calculateTotalPointsSpent(character.skillsSpending)
  character.totalPoints = newTotalPoints < 0 ? 0 : newTotalPoints
  return newState
}

const calculateTotalPointsSpent = (skillsSpending) => {
  const pointsArray = Object.values(skillsSpending);
  const totalPointsSpent = pointsArray.reduce((total, points) => total + points, 0);
  return totalPointsSpent;
};

const checkValidClass = (attributes, className) => {
  const classAttributes = CLASS_LIST[className];
  for (const attribute in classAttributes) {
    if (attributes[attribute] < classAttributes[attribute]) {
      return false;
    }
  }
  return true;
};

