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
      <Button variant="contained" sx={{
        background: '#000',
        "&.MuiButtonBase-root:hover": {
          bgcolor: "#000"
        },
        borderRadius: 0
      }} onClick={() => setLoginOpen(true)}>
        Sign In
      </Button>
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
      <Button variant="contained" sx={{ borderRadius: 0 }} onClick={() => setRegisterPopUP(true)}>
        Register
      </Button>
    </ThemeProvider>
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

