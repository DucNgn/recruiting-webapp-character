import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button, ButtonGroup, Grid, Box, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { modifyAttributePoint, modifySkillSpending } from '../actions/attributesAction';
import { findModifierBySkillName } from '../helper.js'
import { CLASS_LIST } from '../consts';


const CharacterComponent = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [classRequirements, setClassRequirements] = useState(null);

  const { id, totalPoints, attributes, classes, modifiers, skills, skillsSpending } = props.character;
  const dispatch = useDispatch();

  const handleButtonClick = (className) => {
    const requirements = CLASS_LIST[className];
    setClassRequirements(requirements);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onModifyAttributePoint = (characterId, attributeName, additionValue) => {
    dispatch(modifyAttributePoint(characterId, attributeName, additionValue));
  };

  const onModifySkillSpending = (characterId, skillName, additionalSkillPoints) => {
    dispatch(modifySkillSpending(characterId, skillName, additionalSkillPoints))
  }

  return (
    <Box component={Paper} p={2}>
      <Typography variant="h4">Character</Typography>
      <Typography>
        <strong>Total Points:</strong> {totalPoints}
      </Typography>


      <ButtonGroup aria-label="outlined primary button group">
        <Button onClick={() => handleButtonClick('Barbarian')} variant={classes.Barbarian ? 'contained' : 'outlined'}>Barbarian</Button>
        <Button onClick={() => handleButtonClick('Wizard')} variant={classes.Wizard ? 'contained' : 'outlined'}>Wizard</Button>
        <Button onClick={() => handleButtonClick('Bard')} variant={classes.Bard ? 'contained' : 'outlined'}>Bard</Button>
      </ButtonGroup>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Requirements</DialogTitle>
        <DialogContent>
          {classRequirements && (
            <DialogContentText>
              {Object.entries(classRequirements).map(([attribute, value]) => (
                <span key={attribute}>
                  {attribute}: {value}
                  <br />
                </span>
              ))}
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>


      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <Typography variant="h5">Attributes</Typography>
          {Object.entries(attributes).map(([attribute, value]) => (
            <Typography key={attribute}>
              {attribute}: {value} (Modifiers: {modifiers[attribute]})
              {' '}
              <ButtonGroup>
                <Button
                  aria-label="reduce"
                  onClick={() => {
                    onModifyAttributePoint(id, attribute, -1)
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => {
                    onModifyAttributePoint(id, attribute, 1)
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </Typography>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">Skills</Typography>
          {Object.entries(skillsSpending).map(([skillName, value]) => (
            <Typography key={skillName}>
              {skillName}: {value} (Modifier: {findModifierBySkillName(skillName)})
              {' '}
              <ButtonGroup>
                <Button
                  aria-label="reduce"
                  onClick={() => {
                    onModifySkillSpending(id, skillName, -1)
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => {
                    onModifySkillSpending(id, skillName, 1)
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>

              Total: {skills[skillName]}
            </Typography>
          ))}


        </Grid>
      </Grid>
    </Box >
  );
};

export default CharacterComponent;

