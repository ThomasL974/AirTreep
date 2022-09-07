import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { deleteTravel } from '../../../../core/services/travels/travel.service';

const style = {
    position: 'absolute',
    borderRadius: 1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: 'hidden'
};

const ConfirmModal = ({ handleClose, travel, open, setOpen, infos, fetchTravels }) => {

    const handleDelete = async (travelId) => {
        try {
            await deleteTravel(travelId);
            setOpen(false);
            fetchTravels();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{ ...style }}>
                    <h2 id="modal-title">{infos.title}</h2>
                    <p id="modal-description">
                        Voulez-vous vraiment supprimer le voyage : <span className="bold">{infos.travel}</span> ?
                    </p>
                    <div className='btn-action'>
                        <Button className='btn-close' onClick={handleClose}>Fermer</Button>
                        <Button className='btn-delete' onClick={() => handleDelete(travel.id)}>Supprimer</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default ConfirmModal;