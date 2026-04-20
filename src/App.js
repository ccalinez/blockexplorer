
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import alchemy from './Api.js'






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
      {/* The rest of your application */}
    </React.Fragment>
  );
}

export default App;
