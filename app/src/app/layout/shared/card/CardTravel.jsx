import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import test from '../../../../assets/images/test.jpg';
import { NavLink } from 'react-router-dom';
import ConfirmModal from '../confirmModal/ConfirmModal';

const CardTravel = ({ travel, isAuthenticated, fetchTravels }) => {
    const [infos, setInfos] = useState({});
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setInfos({
            title: 'Supprimer un voyage',
            travel: travel.title
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className="travels__card" sx={{ width: 347 }}>
            <CardMedia
                component="img"
                height="200"
                image={test}
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
            <CardActions className='action-card'>
                <NavLink to={'/discover/details/' + travel.id}>
                    <Button className='btn-outlined' size="small" >Plus de détails</Button>
                </NavLink>
                {isAuthenticated &&
                    <>
                        <NavLink className='margin0' to={'/travels/update/' + travel.id}>
                            <Button className='btn-outlined' size="small" >Mise à jour</Button>
                        </NavLink>
                        <Button size="small" className='btn-delete' onClick={handleOpen}>Supprimer</Button>
                        <ConfirmModal
                            handleClose={handleClose}
                            fetchTravels={fetchTravels}
                            travel={travel}
                            open={open}
                            setOpen={setOpen}
                            infos={infos}>
                        </ConfirmModal>
                    </>
                }
            </CardActions>
        </Card>
    )
}

export default CardTravel