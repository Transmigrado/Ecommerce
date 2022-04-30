import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import "./footer.scss"

const Footer = () => {
    return (
        <AppBar className='appbar-footer'>
            <Container maxWidth="md" sx={{display:'flex', justifyContent:'center'}}>
                <Toolbar className="footer">
                    <Typography variant="body1" color="black">
                        By Javier Ponte © 2022
                    </Typography>

                    <a className="link" href="https://www.linkedin.com/in/javier-ponte-gonz%C3%A1lez-67a6a7147/" target="_blank" >
                        <LinkedInIcon sx={{ fontSize: 30, color:'black' }} />
                    </a>
                  
                    <a className="link" href="https://github.com/jeponteg/moviedb" target="_blank">
                        < GitHubIcon sx={{ fontSize: 30, color:'black' }} />
                    </a>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Footer