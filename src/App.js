import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import key, { press, release } from './reducers/key';
import Keyboard from './Keyboard';
import handleSoundsMiddleware from './handleSoundsMiddleware';
import { notes } from './oscillator'

import './App.css';

const store = configureStore({
  reducer: { key },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(handleSoundsMiddleware),
});

const keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''];
let keyToLetter = {};
keys.forEach((key, i) => keyToLetter[key] = notes[i]);

function App() {
  const dispatch = action => ({ key }) => store.dispatch(action(keyToLetter[key]));

  return (
    <Provider store={store}>
      <div className="App" tabIndex={-1} onKeyDown={dispatch(press)} onKeyUp={dispatch(release)} autoFocus>
        <h1>Playing With The Oscillator</h1>
        <Keyboard />
      </div>
    </Provider>
  );
}

export default App;
