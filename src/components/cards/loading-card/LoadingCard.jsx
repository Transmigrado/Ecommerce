import React from "react";
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const LoadingCard = ({ count }) => {
    const cards = () => {
        let totalCards = [];
        for (let i = 0; i < count; i++) {
            totalCards.push(
                <Grid  item xs={12} sm={6} md={4} lg={3}>
                    <Skeleton variant="rectangular" width={300} height={400}/>
                </Grid>
            );
        }
        return totalCards;
    };

    return (
        <Grid container spacing={2} width="90%">
            {cards()}
        </Grid>
    )
 
};

export default LoadingCard;
