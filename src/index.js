import React from 'react'
import ReactDOM from 'react-dom'

import PopUp from './components/dialogBox';
import Signin from './components/modals/signin';
import Register from './components/modals/register';
import { Button } from '@mui/material';

import { BrowserRouter } from 'react-router-dom'

function App() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);

  return (
    <BrowserRouter>
      {loginOpen &&
        <PopUp open={loginOpen} setclose={setLoginOpen} element={<Signin setclose={setLoginOpen} setclose2={setRegisterOpen} />} icon />
      }
      <Button variant="contained" sx={{
        background: '#000',
        "&.MuiButtonBase-root:hover": {
          bgcolor: "#000"
        },
        borderRadius: 0
      }} onClick={() => setLoginOpen(true)}>
        Sign In
      </Button>
    </BrowserRouter>
  );
}

function RegisterForm() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);

  return (
    <BrowserRouter>
      {registerOpen &&
        <PopUp open={registerOpen} setclose={setRegisterOpen} element={<Register setclose={setRegisterOpen} setclose2={setLoginOpen} />} icon />
      }
      <Button variant="contained" sx={{
        background: '#000',
        "&.MuiButtonBase-root:hover": {
          bgcolor: "#000"
        },
        borderRadius: 0
      }} onClick={() => setRegisterOpen(true)}>
        Register
      </Button>
    </BrowserRouter>
  );
}


ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById('react-target-signin')
);

ReactDOM.render(
  React.createElement(RegisterForm, {}, null),
  document.getElementById('react-target-register')
);

