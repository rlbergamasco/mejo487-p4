import React from 'react';
import { Box, Drawer, List, Divider, ListItem, Button, Typography } from '@mui/material';

export const Sidebar = ({ locations, open, toggleDrawer, setOpenDialog }) => {

    const list = (
        <Box
            sx={{ width: 400 }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <List>
                {locations.map((item, index) => (
                    <React.Fragment key={item.name}>
                        <ListItem >
                            {/* <ListItemText primary={item.name} /> */}
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography>{item.blurb}</Typography>
                                <Button onClick={() => setOpenDialog(true)}>Read More</Button>
                            </Box>
                        </ListItem>
                        {index !== locations.length - 1 ? <Divider /> : null}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );

    return (
        <Drawer
            anchor='left'
            open={open}
            onClose={toggleDrawer(false)}
        >
            {list}
        </Drawer>
    );
}
