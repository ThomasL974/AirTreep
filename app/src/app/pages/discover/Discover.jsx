import _ from 'lodash'
import React, { useEffect } from 'react'
import { getTravels } from '../../../services/travels/travel.service'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Discover({ travels, setTravels }) {

    const fetchTravels = async () => {
        try {
            const data = await getTravels()
            setTravels(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTravels();
    }, [])
    return (
        <>
            <h1>Liste des voyages</h1>
            <div className="travels">
                {_.map(travels, (travel, key) => (
                    <Card className="travels__card" sx={{ width: 345 }}>
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
                            <Button size="small">Plus de détails</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default Discover