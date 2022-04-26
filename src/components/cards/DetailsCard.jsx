import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const DetailsCard = ({image, name, finalPrice}) => {
    return(
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={7}>
                <Card className="cart-items">
                    <CardMedia
                        className="image"
                        component="img"
                        height="500"
                        sx={{objectFit: 'contain'}}
                        image={image}
                        alt={name}
                    />
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4} >
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {name}
                        </Typography>
                        <Box className="price-contender">
                        <Typography component="div">
                            <Box className="final-price">
                            $ {finalPrice}
                            </Box>
                        </Typography>
                        <Box className="add-to-cart-button" >
                           
                        </Box>
                        </Box>        
                    </CardContent>
                </Card>
            </Grid>  
        </Grid>
    )
}
export default DetailsCard