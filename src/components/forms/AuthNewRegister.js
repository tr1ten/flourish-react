/* eslint-disable */
import React from 'react'
import Styles from "../../styles/register.module.scss"
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, FormHelperText, Button, IconButton, InputAdornment, OutlinedInput, Tooltip, FormControl, InputLabel } from '@mui/material';
import { IconInfoCircle, IconArrowLeft } from '@tabler/icons';
import AnimateButton from '../AnimateButton';
// import { useDispatch } from 'react-redux';
// import { openSnackbar } from 'store/slices/snackbar';
import axios from 'axios';

function AuthNewRegister(props) {

    Yup.addMethod(Yup.string, "businessEmail", function (errorMessage) {
        return this.test('test-business-email', errorMessage, function (value) {
            const { path, createError } = this;
            let domain = this.parent?.domain;
            if (
                value?.split('@')[1] !== domain
            ) {
                return createError({ path, message: errorMessage });
            }
            return true;
        })
    })

    const validationSchema = Yup.object().shape({
        company_name: Yup.string().required('Company name is required'),
        domain: Yup.string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Invalid Company domain!'
        ).required('Company domain required'),
        company_size: Yup.string().required("Please select a valid option"),
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        email: Yup.string().email().businessEmail('Email must match with the entered business domain.').required("email is required"),
        title: Yup.string().required('Job Title is required')
    })
    return (
        <div className={Styles.register}>
            <Formik
                initialValues={{
                    company_name: '',
                    domain: '',
                    invite_code: '',
                    company_size: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    title: '',
                    linkedin: ''
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const response = await axios.post('https://api.flourish.us/auth/signup', values);
                        console.log(response)
                        if (response?.data?.success) {
                            const { saveData } = response?.data;
                            if (saveData) {
                                window.location.replace(`https://www.app.flourish.us/${saveData.company_name}/create-password/${saveData._uuid}`)
                            }
                            else {
                                props.msg(response?.data?.msg);
                                props.setActiveForm(3)
                            }

                        }
                        else {
                            setErrors({ submit: response?.msg })
                        }
                    } catch (err) {
                        console.error(err);
                    }
                }}
            >
                {({ errors, handleSubmit, handleChange, handleBlur, values, touched }) => (
                    <div className={Styles.section}>
                        {props.activeForm === 1 ? (
                            <>
                                <p className={Styles.heading}>
                                    Fill in your Company Information.
                                </p>
                                <div className={Styles.inputs}>
                                    <div className={Styles.input}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor='company_name'>Company Name*</InputLabel>
                                            <OutlinedInput
                                                autoFocus
                                                fullWidth
                                                error={touched.company_name && errors.company_name}
                                                label="Company Name*"
                                                placeholder="Example: Apple, Inc"
                                                name="company_name"
                                                id="company_name"
                                                type="text"
                                                value={values.company_name}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                inputProps={{ className: Styles.textfield }}
                                            // endAdornment={
                                            //     <InputAdornment position="end">
                                            //         <Tooltip
                                            //             title="Lorem ipsum dolor sit amet."
                                            //             arrow placement='right-start'
                                            //         >
                                            //             <IconButton
                                            //                 aria-label="toggle password visibility"
                                            //                 edge="end"
                                            //                 size="large"
                                            //             >
                                            //                 <IconInfoCircle />
                                            //             </IconButton>
                                            //         </Tooltip>

                                            //     </InputAdornment>
                                            // }
                                            />
                                        </FormControl>
                                        <div className={Styles.error}>
                                            {touched.company_name && errors.company_name && (
                                                <FormHelperText className={Styles.error_message} error>
                                                    {errors.company_name}
                                                </FormHelperText>
                                            )}
                                        </div>
                                    </div>
                                    <div className={Styles.input}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor='domain'>Company Domain*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={touched.domain && errors.domain}
                                                label="Company Domain*"
                                                placeholder="Example: apple.com"
                                                name="domain"
                                                id="domain"
                                                type="url"
                                                value={values.domain}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                inputProps={{ className: Styles.textfield }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <Tooltip
                                                            title="please remove https://www. from the domain name. For example, use apple.com not https://www.apple.com"
                                                            arrow placement='right-start'
                                                        >
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                edge="end"
                                                                size="large"
                                                            >
                                                                <IconInfoCircle />
                                                            </IconButton>
                                                        </Tooltip>

                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        <div className={Styles.error}>
                                            {touched.domain && errors.domain && (
                                                <FormHelperText className={Styles.error_message} error>
                                                    {errors.domain}
                                                </FormHelperText>
                                            )}
                                        </div>
                                    </div>
                                    <div className={Styles.input}>
                                        <TextField
                                            fullWidth
                                            label='Company Size*'
                                            name='company_size'
                                            select
                                            value={values.company_size}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{ className: Styles.textfield }}
                                        >
                                            <MenuItem value="less than 100">Less than 100</MenuItem>
                                            <MenuItem value="100-500">100-500</MenuItem>
                                            <MenuItem value="500-1000">500-1000</MenuItem>
                                            <MenuItem value="1000+">1000+</MenuItem>
                                        </TextField>
                                        <div className={Styles.error}>
                                            {touched.company_size && errors.company_size && (
                                                <FormHelperText className={Styles.error_message} error>
                                                    {errors.company_size}
                                                </FormHelperText>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <AnimateButton>
                                    <Button disabled={errors.company_name || errors.domain || errors.company_size} className={Styles.button} onClick={() => props.setActiveForm(2)} color="secondary" fullWidth size="large" variant="contained">
                                        Continue
                                    </Button>
                                </AnimateButton>
                            </>
                        )
                            :
                            (
                                <>
                                    <button className={Styles.back} onClick={() => props.setActiveForm(1)}><IconArrowLeft /></button>
                                    <p className={Styles.heading}>
                                        Fill in Admin Contact Details.
                                    </p>
                                    <div className={Styles.inputs}>
                                        <div className={Styles.row}>
                                            <div className={Styles.input}>
                                                <TextField
                                                    autoFocus
                                                    fullWidth
                                                    error={touched.first_name && errors.first_name}
                                                    label="First Name*"
                                                    name="first_name"
                                                    type="text"
                                                    value={values.first_name}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    inputProps={{ className: Styles.textfield }}
                                                />
                                                <div className={Styles.error}>
                                                    {touched.first_name && errors.first_name && (
                                                        <FormHelperText className={Styles.error_message} error>
                                                            {errors.first_name}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={Styles.input}>
                                                <TextField
                                                    fullWidth
                                                    error={touched.last_name && errors.last_name}
                                                    label="Last Name*"
                                                    name="last_name"
                                                    type="text"
                                                    value={values.last_name}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    inputProps={{ className: Styles.textfield }}
                                                />
                                                <div className={Styles.error}>
                                                    {touched.last_name && errors.last_name && (
                                                        <FormHelperText className={Styles.error_message} error>
                                                            {errors.last_name}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={Styles.row}>
                                            <div className={Styles.input}>
                                                <FormControl fullWidth>
                                                    <InputLabel htmlFor='email'>Email*</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        error={touched.email && errors.email}
                                                        label="Email*"
                                                        name="email"
                                                        type="email"
                                                        id='email'
                                                        value={values.email}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        inputProps={{ className: Styles.textfield }}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <Tooltip
                                                                    title="You must use your Company email that matches the domain of your organization"
                                                                    arrow placement='right-start'
                                                                >
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        // onMouseDown={handleMouseDownPassword}
                                                                        edge="end"
                                                                        size="large"
                                                                    >
                                                                        <IconInfoCircle />
                                                                    </IconButton>
                                                                </Tooltip>

                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                                <div className={Styles.error}>
                                                    {touched.email && errors.email && (
                                                        <FormHelperText className={Styles.error_message} error>
                                                            {errors.email}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={Styles.input}>
                                                <TextField
                                                    fullWidth
                                                    error={touched.title && errors.title}
                                                    label="Job Title*"
                                                    name="title"
                                                    type="text"
                                                    value={values.title}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    inputProps={{ className: Styles.textfield }}
                                                />
                                                <div className={Styles.error}>
                                                    {touched.title && errors.title && (
                                                        <FormHelperText className={Styles.error_message} error>
                                                            {errors.title}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={Styles.input}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor='linkedin'>LinkedIn(Optional)</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    error={touched.linkedin && errors.linkedin}
                                                    label="LinkedIn(Optional)"
                                                    placeholder="LinkedIn Url"
                                                    name="linkedin"
                                                    id='linkedin'
                                                    type="url"
                                                    value={values.linkedin}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    inputProps={{ className: Styles.textfield }}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <Tooltip
                                                                title="Providing your LinkedIn will help verify your identity
                                                         and speed up the Registration approval process significantly."
                                                                arrow placement='right-start'
                                                            >
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    // onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                    size="large"
                                                                >
                                                                    <IconInfoCircle />
                                                                </IconButton>
                                                            </Tooltip>

                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </div>
                                        <div className={Styles.input}>
                                            <TextField
                                                fullWidth
                                                error={touched.invite_code && errors.invite_code}
                                                label="Have an invite code? Enter it here"
                                                placeholder="1234"
                                                name="invite_code"
                                                type="text"
                                                value={values.invite_code}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                inputProps={{ className: Styles.textfield }}
                                            />
                                        </div>
                                    </div>
                                    <AnimateButton>
                                        <Button className={Styles.button} onClick={handleSubmit} color="secondary" fullWidth size="large" variant="contained">
                                            Register
                                        </Button>
                                    </AnimateButton>
                                </>
                            )
                        }

                    </div>
                )
                }

            </Formik >

        </div >
    )
}

export default AuthNewRegister