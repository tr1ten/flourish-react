/* eslint-disable */
import React from 'react'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import ClearIcon from '@mui/icons-material/Clear';
import Styles from "../styles/dialog.module.scss"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function dialogBox(props) {

    const handleClose = () => {
        window.localStorage.removeItem('showDialog');
        props.setclose(false);
    }
    return (
        <Dialog
            open={props.open}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                classes: {
                    root: Styles.dialog,
                }
            }}
            scroll='body'
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            {props.icon &&
                <button className={Styles.close} onClick={handleClose}>
                    <ClearIcon className={Styles.icon} />
                </button>
            }
            {props.element}
        </Dialog>
    )
}

export default dialogBox