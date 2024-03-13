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
      <a className='cta nav-cta w-button' onClick={() => setLoginOpen(true)}>
        Sign In
      </a>
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
      <a className='cta light w-button' onClick={() => setRegisterOpen(true)}>
        Register for FREE
      </a>
    </BrowserRouter>
  );
}
function RegisterNowForm() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);

  return (
    <BrowserRouter>
      {registerOpen &&
        <PopUp open={registerOpen} setclose={setRegisterOpen} element={<Register setclose={setRegisterOpen} setclose2={setLoginOpen} />} icon />
      }
      <a className='cta light w-button' onClick={() => setRegisterOpen(true)}>
        Register now
      </a>
    </BrowserRouter>
  );
}

for(const doc of document.querySelectorAll('[id=react-target-signin]')) {
  ReactDOM.render(
    React.createElement(App, {}, null),
    doc
  );
}
for(const doc of document.querySelectorAll('[id=react-target-register]')) {
  ReactDOM.render(
    React.createElement(RegisterForm, {}, null),
    doc
  );
}
for(const doc of document.querySelectorAll('[id=react-target-register-now]')) {
  ReactDOM.render(
    React.createElement(RegisterNowForm, {}, null),
    doc
  );
}

// ReactDOM.render(
//   React.createElement(RegisterForm, {}, null),
//   document.getElementById('react-target-register')
// );

