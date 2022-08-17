import { Card } from '@mui/material'
import React from 'react'
import { BsPlusLg } from 'react-icons/bs'

function CardAdd() {
    return (
        <Card className="travels__card-add travels__card" sx={{ width: 347, height: 200 }}>
            <BsPlusLg/>
        </Card>
    )
}

export default CardAdd