import Key from './Key'
import { getOscillator } from './oscillator'

import './App.css';

const oscillators = [1,2,3,4,5,6,7,8].map(v => getOscillator(440 + 20 * v))

function App() {
  return (
    <div className="App">
      <h1>Playing With The Oscillator</h1>
      <div className="keyboard">
        {oscillators.map((oscillator, i) => (
          <Key oscillator={oscillator} key={i} />
        ))}
      </div>
    </div>
  );
}

export default App;
