import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import logo from '../star-wars.svg';

const MyHeader = function () {
    return (
        <AppBar position="relative">
            <Toolbar>
                <img
                    src={logo}
                    alt="logo"
                    height="50px"
                    width="50px"
                    className="header-title"
                />
                <Typography variant="h6" color="inherit" noWrap>
                    Star wars characters
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default MyHeader;
