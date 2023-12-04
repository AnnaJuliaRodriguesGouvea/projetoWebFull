import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import {Button} from "@mui/material";
import {useContext} from "react";
import {AppContext} from "../App";
import Box from "@mui/material/Box";
import Notification from "./Notification";

const Header = () => {
    const context = useContext(AppContext);

    const handleLogout = () => {
        context.setAuthenticated(false)
        localStorage.clear()
        context.setNotifications([])
        context.socket.close()
    }
    const handleAdd = () => {
        context.setShowInsertFruit(true)
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#125C13', height: '80px', justifyContent: 'center' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flexGrow: 1 }} />
                    <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: '1' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <FoodBankIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '300%' }} />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: 'Playpen Sans',
                                    fontWeight: '500',
                                    letterSpacing: '.2rem',
                                }}
                            >
                                FRUITYVICE
                            </Typography>
                        </Box>
                    </Container>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Notification/>
                        <Button color="inherit" onClick={handleAdd}>
                            Adicionar
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
