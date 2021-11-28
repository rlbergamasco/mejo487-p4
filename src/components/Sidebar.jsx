import React from 'react';
import { Box, Drawer, List, Divider, ListItem, Link, Typography } from '@mui/material';

export const Sidebar = ({ locations, open, setOpenSidebar, setOpenDialog, setOpenInfo, setSelected }) => {

    const handleClick = (selected) => {
        setSelected(selected);
        setOpenDialog(true);
        setOpenInfo(false);
    }

    const list = (
        <Box
            sx={{ maxWidth: 400 }}
            role="presentation"
            onClick={() => setOpenSidebar(false)}
        >
            <List>
                {locations.map((item, index) => (
                    <React.Fragment key={item.name}>
                        <ListItem >
                            {/* <ListItemText primary={item.name} /> */}
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography>{item.address}</Typography>
                                <Link underline="hover" onClick={() => handleClick(item)}>Read More</Link>
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
            anchor='right'
            open={open}
            onClose={() => setOpenSidebar(false)}
        >
            {list}
        </Drawer>
    );
}
