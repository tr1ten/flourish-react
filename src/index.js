import React from 'react'
import ReactDOM from 'react-dom'

import PopUp from './components/dialogBox';
import Signin from './components/modals/signin';
import Register from './components/modals/register';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel, FormGroup, Checkbox, TextField, Button } from '@mui/material';
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000'
    }
  },
});


function App() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      {loginOpen &&
        <PopUp open={loginOpen} setclose={setLoginOpen} element={<Signin setclose={setLoginOpen} setclose2={setRegisterOpen} />} icon />
      }
      <a className='cta nav-cta w-button' onClick={() => setLoginOpen(true)}>
        Sign In
      </a>
    </ThemeProvider>
  );
}

function RegisterForm() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [RegisterPopUp, setRegisterPopUP] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const [checked, setChecked] = React.useState();

  const handleClick = () => {
    setRegisterPopUP(false);
    setRegisterOpen(true);
  }

  const RegisterComponent = () => {
    return (
      <>
        <DialogContent>
          <FormGroup>
            <FormControlLabel required control={<Checkbox checked={checked} onChange={(event) => setChecked(!checked)} />}
              label="Yes! I am an HR Executive, or other qualified administrator, and I’m authorized to add my Company and its employees to Flourish!"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#000" }} disabled={!checked} onClick={handleClick}>Continue</Button>
          <Button sx={{ color: "red" }} onClick={() => setRegisterPopUP(false)}>Close</Button>
        </DialogActions>
      </>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      {RegisterPopUp &&
        <PopUp open={RegisterPopUp} setclose={setRegisterPopUP} element={<RegisterComponent />} />
      }
      {registerOpen &&
        <PopUp open={registerOpen} setclose={setRegisterOpen} element={<Register setclose={setRegisterOpen} setclose2={setLoginOpen} />} icon />
      }
      <a className='cta light w-button' onClick={() => setRegisterPopUP(true)}>
        Register for FREE
      </a>
    </ThemeProvider >
  );
}

function RegisterGetStartedForm() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [RegisterPopUp, setRegisterPopUP] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const [checked, setChecked] = React.useState();

  const handleClick = () => {
    setRegisterPopUP(false);
    setRegisterOpen(true);
  }

  const RegisterComponent = () => {
    return (
      <>
        <DialogContent>
          <FormGroup>
            <FormControlLabel required control={<Checkbox checked={checked} onChange={(event) => setChecked(!checked)} />}
              label="Yes! I am an HR Executive, or other qualified administrator, and I’m authorized to add my Company and its employees to Flourish!"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#000" }} disabled={!checked} onClick={handleClick}>Continue</Button>
          <Button sx={{ color: "red" }} onClick={() => setRegisterPopUP(false)}>Close</Button>
        </DialogActions>
      </>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      {RegisterPopUp &&
        <PopUp open={RegisterPopUp} setclose={setRegisterPopUP} element={<RegisterComponent />} />
      }
      {registerOpen &&
        <PopUp open={registerOpen} setclose={setRegisterOpen} element={<Register setclose={setRegisterOpen} setclose2={setLoginOpen} />} icon />
      }
      <a style={{width:"100%"}} className='cta w-button' onClick={() => setRegisterPopUP(true)}>
        Get started
      </a>
    </ThemeProvider >
  );
}

function RegisterNowForm() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [RegisterPopUp, setRegisterPopUP] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const [checked, setChecked] = React.useState();

  const handleClick = () => {
    setRegisterPopUP(false);
    setRegisterOpen(true);
  }

  const RegisterComponent = () => {
    return (
      <>
        <DialogContent>
          <FormGroup>
            <FormControlLabel required control={<Checkbox checked={checked} onChange={(event) => setChecked(!checked)} />}
              label="Yes! I am an HR Executive, or other qualified administrator, and I’m authorized to add my Company and its employees to Flourish!"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#000" }} disabled={!checked} onClick={handleClick}>Continue</Button>
          <Button sx={{ color: "red" }} onClick={() => setRegisterPopUP(false)}>Close</Button>
        </DialogActions>
      </>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      {RegisterPopUp &&
        <PopUp open={RegisterPopUp} setclose={setRegisterPopUP} element={<RegisterComponent />} />
      }
      {registerOpen &&
        <PopUp open={registerOpen} setclose={setRegisterOpen} element={<Register setclose={setRegisterOpen} setclose2={setLoginOpen} />} icon />
      }
      <a className='cta light w-button' onClick={() => setRegisterPopUP(true)}>
        Register now
      </a>
    </ThemeProvider >
  );
}



for (const doc of document.querySelectorAll('[id=react-target-signin]')) {
  ReactDOM.render(
    React.createElement(App, {}, null),
    doc
  );
}
for (const doc of document.querySelectorAll('[id=react-target-register]')) {
  ReactDOM.render(
    React.createElement(RegisterForm, {}, null),
    doc
  );
}
for (const doc of document.querySelectorAll('[id=react-target-register-now]')) {
  ReactDOM.render(
    React.createElement(RegisterNowForm, {}, null),
    doc
  );
}

for (const doc of document.querySelectorAll('[id=react-target-get-started]')) {
  ReactDOM.render(
    React.createElement(RegisterGetStartedForm, {}, null),
    doc
  );
}



// ReactDOM.render(
//   React.createElement(RegisterForm, {}, null),
//   document.getElementById('react-target-register')
// );

