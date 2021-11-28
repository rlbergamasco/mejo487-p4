import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    IconButton,
    Typography,
    Button,
    Box,
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
        height: "1500px",
    },
});

export const InfoDialog = withStyles(styles)(
    ({ handleClose, selected, changeSelectedIdx, open, classes }) => {
        const [isLoading, setIsLoading] = useState(false);

        const handleClick = (amount) => {
            changeSelectedIdx(amount);
            setIsLoading(true);
            const timeout = setTimeout(() => {
                setIsLoading(false);
            }, 1)
            return () => clearTimeout(timeout);
        }

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
                    {isLoading ?
                        <Box height="100%" display="flex" justifyContent="center" alignItems="center" />
                        :
                        <React.Fragment>
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
                        </React.Fragment>
                    }
                </DialogContent>
                <DialogActions>
                    {selected.index > 1 ? <Button onClick={() => handleClick(-1)}>Previous</Button> : null}
                    <Box display="flex" flexGrow={1} />
                    {selected.index < 18 ? <Button onClick={() => handleClick(1)}>Next</Button> : null}
                </DialogActions>
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
