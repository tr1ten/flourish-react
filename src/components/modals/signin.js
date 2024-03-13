/* eslint-disable */
import React from 'react'
import DialogContent from '@mui/material/DialogContent';
import AuthLogin from "../forms/AuthLogin";
import Styles from "../../styles/dialog.module.scss"

function Signin(props) {
    const handleClick = () => {
        props.setclose(false);
        props.setclose2(true);
    }
    return (
        <div className={Styles.loginform}>
            <div className={Styles.heading}>
                <h2>Sign in</h2>
                <p>Enter your credentials to continue.</p>
            </div>
            <DialogContent>
                <AuthLogin />
            </DialogContent>
            <p className={Styles.signin}>Don't have an account? <button onClick={handleClick}>Register</button></p>
        </div>
    )
}

export default Signin