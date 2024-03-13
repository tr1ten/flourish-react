/* eslint-disable */
import React from 'react'
import DialogContent from '@mui/material/DialogContent';
import Styles from "../../styles/dialog.module.scss"
import AuthNewRegister from '../forms/AuthNewRegister';

function Register(props) {

    const [activeform, setActiveform] = React.useState(1);
    const [msg, setmsg] = React.useState("");

    const handleClick = () => {
        props.setclose(false);
        props.setclose2(true);
    }
    return (
        <div className={Styles.loginform}>
            {activeform > 2 ? (
                <div className={Styles.msg_dialog}>
                    <h2 className={Styles.msg_heading}>Thank You!</h2>
                    <p className={Styles.msg}>{msg}</p>
                </div>
            ) : (
                <>
                    <div className={Styles.heading}>
                        <h2>Register</h2>
                        <p className={Styles.indicator}>
                            Step {activeform}/2
                        </p>
                    </div>

                    <div className={Styles.stepper}>
                        <div className={`${Styles.step} ${activeform > 0 ? Styles.active : ""}`}></div>
                        <div className={`${Styles.step} ${activeform > 1 ? Styles.active : ""}`}></div>
                        {/* <div className={`${Styles.step} ${activeform>2?Styles.active:""}`}></div> */}
                    </div>
                    <DialogContent sx={{ paddingTop: '0' }}>
                        <AuthNewRegister activeForm={activeform} setActiveForm={setActiveform} msg={setmsg} />
                    </DialogContent>
                    {/* <p className={Styles.signin}>Already have an account? <button onClick={handleClick}>Sign in</button></p> */}
                </>
            )
            }

        </div >
    )
}

export default Register