
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import BlockDetails from './BlockDetails';
import TransactionContainer from './TransactionContainer'
import {Container} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider, Outlet, redirect} from "react-router-dom";
import {getBlock, getTx} from './Api.js';
import Transaction from './Transaction';

const router = createBrowserRouter([
  {
    path: "/",
    // La raíz decide: ¿A dónde mando al usuario por defecto?
    loader: () => redirect("/block/latest"),
  },
  {
    path: "/block",
    // Si alguien entra a /block a secas, también lo mandamos a latest
    loader: () => redirect("/block/latest"),
  },
  {
    path: "/block/:id",
    element: <BlockDetails />,
    loader: async ({ params }) => {
      const blockId = params.id === "latest" ? "latest" : Number(params.id);
      const block = await getBlock(blockId);
      if (!block) throw new Response("Not Found", { status: 404 });
      return { block };
    }
  },
  {
     path: "/block/:id/tx",
     element: <TransactionContainer />,
     loader: async ({ params }) => {
      const blockId = params.id === "latest" ? "latest" : Number(params.id);
      const block = await getBlock(blockId);
      if (!block) throw new Response("Not Found", { status: 404 });
      return { transactions: block.transactions };
    }
  },
  {
     path: "/tx/:id",
     element: <Transaction />,
     loader: async ({ params }) => {
      const txId =  params.id;
      const tx = await getTx(txId);
      if (!tx) throw new Response("Not Found", { status: 404 });
      return {tx};
    }
  }

]);

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

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container sx={{ bgcolor: 'primary.main', height: '100vh', }}>
          <RouterProvider router={router} future={{
    v7_startTransition: true,
  }}/>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
