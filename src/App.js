import * as React from 'react';
import ChordSelector from './Components/ChordSelector';
import './App.css';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';

function App () {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
        <ChordSelector/>
      <footer>
        <p>Made by Vicknesh Ravikumar | <a href='https://github.com/itsViggo/marvins-chords' target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>Source</a></p>
      </footer>
    </div>
    </ThemeProvider>
  );
}

export default App;
