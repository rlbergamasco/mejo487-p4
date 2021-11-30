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

export const InfoDialog = withStyles(styles)(
    ({ handleClose, selected, open, classes }) => {
        return (
            <Dialog
                onClose={handleClose}
                open={open}
                fullWidth
                maxWidth="md"
                classes={{ paper: classes.paper }}
            >
                <DialogTitle disableTypography className={classes.root} sx={{ padding: '12px 16px' }}>
                    <Grid container direction="row" alignItems="center">
                        <Grid item style={{ display: "flex", flexGrow: 1 }} />
                        <Grid item>
                            <CloseButton onClick={handleClose} />
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h2" align="center">
                        {selected.name}
                    </Typography>
                    <Typography align="center">
                        {selected.address}
                    </Typography>
                    <img src={selected.image} alt={selected.name} />
                    <Typography>
                        {selected.description}
                    </Typography>
                </DialogContent>
            </Dialog>
        );
    }
);

const CloseButton = withStyles(styles)(({ onClick, classes }) => {
    return (
        <IconButton onClick={onClick}>
            <Close className={classes.button} />
        </IconButton>
    );
});