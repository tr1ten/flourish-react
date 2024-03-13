import React from 'react'
import ReactDOM from 'react-dom'

import PopUp from './components/dialogBox';
import Signin from './components/modals/signin';

import { BrowserRouter } from 'react-router-dom'

function App() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);

  return (
    <BrowserRouter>
      {loginOpen &&
        <PopUp open={loginOpen} setclose={setLoginOpen} element={<Signin setclose={setLoginOpen} setclose2={setRegisterOpen} />} icon />
      }
      <button variant="primary" onClick={() => setLoginOpen(true)}>
        Sign In
      </button>
    </BrowserRouter>
  );
}


ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById('react-target-signin')
);

