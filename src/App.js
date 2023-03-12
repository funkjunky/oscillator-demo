import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import notePressed, { press, release } from './reducers/notePressed';
import synth from './reducers/synth';
import Synth from './Synth';
import handleSoundsMiddleware from './handleSoundsMiddleware';
import { notes } from './oscillator'

import './App.css';

const store = configureStore({
  reducer: { notePressed, synth },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(handleSoundsMiddleware),
});

const keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''];
let keyToLetter = {};
keys.forEach((key, i) => keyToLetter[key] = notes[i]);

function App() {
  const dispatch = action => ({ key }) => keys.indexOf(key) !== -1 && store.dispatch(action(keyToLetter[key]));

  return (
    <Provider store={store}>
      <div className="App" tabIndex={-1} onKeyDown={dispatch(press)} onKeyUp={dispatch(release)} autoFocus>
        <h1>Playing With The Oscillator</h1>
        <Synth />
      </div>
    </Provider>
  );
}

export default App;
