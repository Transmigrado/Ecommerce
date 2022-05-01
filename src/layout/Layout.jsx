import React from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import Box from '@mui/material/Box';

const Layout = ({children}) =>{
    return(
        <>
            <Header />
                <Box paddingTop={10} minHeight='90vh' >
                    {children}
                </Box>
            <Footer />
        </>

    )
}
export default Layout