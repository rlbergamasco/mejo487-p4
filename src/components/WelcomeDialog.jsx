import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    IconButton,
    Typography,
    Link
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
                    18 Must-See Castles in the United States
                </Typography>
                <img src='images/main.jpeg' alt="Lyndhurst Mansion" />
                <Typography>
                    Visiting castles probably brings to mind the grand castles of England,
                    Ireland and Scotland, but you don’t have to travel all the way across
                    the Atlantic to see one. In fact, you’ll find quite a few right here at
                    home. Spanning the nation from east to west, these castles may not be as
                    old as the magnificent structures throughout Europe, but many of their
                    designs were inspired by them and are well worth exploring.
                    <br /><br />
                    Read more about each castle by exploring the locations on the map or click
                    the menu icon to see the list view. Click on the info icon to see this
                    window again.
                    <br /><br />
                    Story and images from <Link underline="hover" href="https://theculturetrip.com/north-america/usa/articles/the-12-most-beautiful-castles-in-the-united-states/">The Culture Trip</Link>
                    {" "}and <Link underline="hover" href="https://www.tripstodiscover.com/19-must-see-castles-in-the-u-s/">Trips to Discover</Link>.
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
