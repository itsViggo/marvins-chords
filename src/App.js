import logo from './marvin.svg';
import * as React from 'react';
import ChordSelector from './Components/ChordSelector';
import './App.css';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{margin: '30px'}}>
          Marvin wants to know what chords you can play...
        </p>
        <ChordSelector/>
      </header>
    </div>
    </ThemeProvider>
  );
}

export default App;
