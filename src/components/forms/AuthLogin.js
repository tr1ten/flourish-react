import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Styles from "../../styles/login.module.scss";

// material-ui
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
// import AnimateButton from 'ui-component/extended/AnimateButton';
// import useAuth from 'hooks/useAuth';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ loginProp, ...others }) => {

    // const { login } = useAuth();

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    // const res = await login(values.email, values.password);
                    // if (res.msg) {
                    //     setErrors({ submit: res.msg })
                    // }
                    // else {
                    //     setStatus({ success: true });
                    //     setSubmitting(false);
                    // }

                } catch (err) {
                    console.error(err);
                    setStatus({ success: false });
                    setErrors({ submit: "Failed" });
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <div className={Styles.form}>
                        <div className={Styles.inputs}>
                            <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                                {/* <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel> */}
                                <OutlinedInput
                                    placeholder='Email Address'
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    inputProps={{ className: Styles.input }}
                                />
                                {touched.email && errors.email && (
                                    <FormHelperText className={Styles.error_message} id="standard-weight-helper-text-email-login">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                                {/* <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel> */}
                                <OutlinedInput
                                    placeholder='Password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    inputProps={{ className: Styles.input }}
                                />
                                {touched.password && errors.password && (
                                    <FormHelperText className={Styles.error_message} id="standard-weight-helper-text-password-login">
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </div>
                        <div className={Styles.inputs_2}>
                            <Grid container alignItems="center" justifyContent="space-between" marginTop={1}>
                                <Grid item>
                                    {/* <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label="Keep me logged in"
                                /> */}
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="subtitle1"
                                        component={Link}
                                        to='/forgot-password'
                                        color="#000"
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        Forgot Password?
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>

                        {errors.submit && (
                            <Box sx={{ mt: 1 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <Button>
                                <Button className={Styles.button} color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                    Sign In
                                </Button>
                            </Button>
                        </Box>
                    </div>
                </form>
            )}
        </Formik>
    );
};

JWTLogin.propTypes = {
    loginProp: PropTypes.number
};

export default JWTLogin;
