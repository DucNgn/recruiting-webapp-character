import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Alert, Snackbar } from '@mui/material';
import axios from 'axios';

import { updateStates } from './actions/attributesAction';
import CharacterComponent from './components/character';
import { initialState } from './defaultState';
import './App.css';

function App() {
  const [alertMessage, setAlertMessage] = useState('');
  const dispatch = useDispatch();
  const apiURL = "https://recruiting.verylongdomaintotestwith.ca/api/{duc_ngn}/character"

  const getStates = () => {
    axios.get(apiURL)
      .then((response) => {
        const receivedStates = response.data
        console.log('States retrieved successfully:', receivedStates);
        if (receivedStates && receivedStates["message"] !== "Item not found") {
          dispatch(updateStates(receivedStates.body))
          setAlertMessage('Successfully retrieved character sheet!');
        } else {
          dispatch(updateStates(initialState))
        }
      })
      .catch((error) => {
        console.error('Error retrieving states:', error);
      });
  };

  useEffect(() => {
    getStates();
  }, []);

  const saveStates = (states) => {
    axios.post(apiURL, states)
      .then((response) => {
        console.log('States saved successfully:', response.data);
        setAlertMessage('Successfully saved character sheet!');
      })
      .catch((error) => {
        console.error('Error saving states:', error);
        setAlertMessage('Failed to save character sheet!');
      });
  }

  const charactersArray = useSelector(state => state.characters);

  const handleSave = () => {
    saveStates(charactersArray)
  }

  const handleCloseAlert = () => {
    setAlertMessage('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Character Sheet</h1>
      </header>
      <section className="App-section">
        <div>
          {charactersArray.map(c => (
            <CharacterComponent
              character={c}
            />
          ))}
        </div>
      </section>
      <Button
        onClick={() => handleSave()}
      >
        SAVE SHEET </Button>
      <Snackbar open={!!alertMessage} autoHideDuration={4000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertMessage.includes('failed') ? 'error' : 'success'}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div >
  );
}

export default App
