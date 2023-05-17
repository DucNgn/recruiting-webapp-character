import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'

const store = createStore(rootReducer)

export default store

/*
 *
 *
 *
 *
  characters = {
   'character_1': {
    total_point: 14,
    attributes: {
          Strength: 1
          Dexterity: 2
          Constitution: 3
          Intelligence: 4
          Wisdom: 5
          Charisma: 6
    },
    modifiers: {
          Strength: 1
          Dexterity: 2
          Constitution: 3
          Intelligence: 4
          Wisdom: 5
          Charisma: 6
    },
    skills: {
      'Acrobatics': 1
      'Animal Handling': 10
      'Arcana': 20
      'Athletics': 30
      'Deception': 10
      'History': 20
      'Insight: 20
      'Intimidation': 20
      'Investigation': 20
      'Medicine': 20
      'Nature': 20
      'Perception': 20
      'Performance': 20
      'Persuasion': 20
      'Religion': 20
      'Sleight of Hand': 20
      'Stealth': 20
      'Survival': 20
    }

  
  }
 * */


