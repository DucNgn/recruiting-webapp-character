import { SKILL_LIST } from "./consts";

export const findModifierBySkillName = (skillName) => {
  const skill = SKILL_LIST.find(
    (skill) => skill.name.replace(/\s/g, '_') === skillName.replace(/\s/g, '_')
  );
  return skill ? skill.attributeModifier : null;
};
