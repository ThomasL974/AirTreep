import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { getTravel } from '../../../../core/services/travels/travel.service';
import { NavLink } from 'react-router-dom';

const CardTravel = ({ travel, key, isAuthenticated, handleDelete }) => {
    return (
        <Card key={key} className="travels__card" sx={{ width: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image="app/src/assets/images/test.jpg"
                alt="image de test"
            />
            <CardContent>
                <Typography className="travels__card-title" gutterBottom variant="h5" component="div">
                    {travel.title}
                </Typography>
                <Typography className="travels__card-description" variant="body2" color="text.secondary">
                    {travel.description}
                </Typography>
            </CardContent>
            <CardActions>
                <NavLink to={'/travels/details/'+travel.id}>
                    <Button size="small" >Plus de détails</Button>
                </NavLink>
                {isAuthenticated &&
                    <Button size="small" onClick={() => handleDelete(travel.id)}>Supprimer</Button>
                }
            </CardActions>
        </Card>
    )
}

export default CardTravel