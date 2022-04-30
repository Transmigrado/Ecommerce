import React from 'react'
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import './header.scss'

const Header = () => {

    const { cart } = useSelector((state) => ({ ...state }));
    
    let history = useHistory();

    const  handleClick = () =>  history.push("/")
    const  handleClickMenu = () => history.push("/cart")

    return (

        <AppBar position="fixed" sx={{background:"white"}} > 
            <Box className='sticky-box'>
                <Typography className='stiky'variant="h6" noWrap component="div" fontSize={12}>
                    Te presentamos nuestras colecciones de Amiibo
                </Typography>
            </Box>
            <Container className="header-container">
                <Toolbar disableGutters className="toolbar">
                    <Typography
                        onClick = { () => handleClick()}
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex'}}}
                    >
                        Amiibo
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                     
                        <Button className="button-link-menu" onClick={() => handleClickMenu()} >
                           <ShoppingCartIcon sx={{color:"#000000"}}  />
                            <span className="span-amount-cart">
                                {cart.length}
                            </span>
                        </Button>
                   
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            sx={{color:'black'}}
                        >
                        <MenuIcon />
                        </IconButton > 
                    </Box>

                    <Typography
                        onClick = { () => handleClick()}
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color:'#000000', cursor:'pointer' }}
                    >
                        Amiibo
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton  sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header