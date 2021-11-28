import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";

const styles = () => ({
    root: {
        margin: 0,
    },
    button: {
        display: "flex",
        justifyContent: "center",
        padding: 0,
    },
    paper: {
        width: "890px",
        height: "1000px",
    },
});

export const WelcomeDialog = withStyles(styles)(({ handleClose, open, classes }) => {
    return (
        <Dialog
            onClose={handleClose}
            open={open}
            fullWidth
            maxWidth="md"
            classes={{ paper: classes.paper }}
        >
            <DialogTitle disableTypography className={classes.root}>
                <Grid container direction="row" alignItems="center">
                    <Grid item style={{ display: "flex", flexGrow: 1 }} />
                    <Grid item>
                        <CloseButton onClick={handleClose} />
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h2" align="center">
                    Title
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </DialogContent>
        </Dialog>
    );
});

const CloseButton = withStyles(styles)(({ onClick, classes }) => {
    return (
        <IconButton onClick={onClick}>
            <Close className={classes.button} />
        </IconButton>
    );
});
