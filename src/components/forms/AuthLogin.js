import PropTypes from 'prop-types';
import React from 'react';
import Styles from "../../styles/login.module.scss";
import axios from 'axios';

// material-ui
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Link,
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
import AnimateButton from '../AnimateButton';
// import AnimateButton from 'ui-component/extended/AnimateButton';
// import useAuth from 'hooks/useAuth';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ loginProp, ...others }) => {
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
                    const response = await axios.post('https://api.flourish.us/auth/all_login', { email: values?.email, password: values?.password });
                    const { access_token, data } = response.data;
                    if (!response.data.msg) {
                        window.location.replace(`https://www.app.flourish.us/dashboard?token=${access_token}`)
                    }
                    else {
                        setErrors({ submit: response?.data?.msg })
                    }
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
                                    <Link
                                        variant="subtitle1"
                                        href='https://www.app.flourish.us/forgot-password'
                                        color="#000"
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        Forgot Password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>

                        {errors.submit && (
                            <Box sx={{ mt: 1 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button className={Styles.button} disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                    Sign In
                                </Button>
                            </AnimateButton>
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
