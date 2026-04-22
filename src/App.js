
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import alchemy from './Api.js'
import Block from './Block.js';
import {Container} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


function App() {
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container sx={{ bgcolor: 'primary.main', height: '100vh', }}>
          <Block />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
