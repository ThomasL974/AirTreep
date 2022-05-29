import React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import _ from 'lodash';
import { InputLabel } from '@mui/material';

const SelectList = ({label, dataOptions, nameOption, locomotion, handleChange}) => {

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="select">Locomotions</InputLabel>
                <Select
                    labelId="select"
                    id="select"
                    value={locomotion}
                    name={nameOption}
                    label={label}
                    onChange={handleChange}
                    defaultValue={dataOptions[0].value}
                >
                    {_.map(dataOptions, (value, key)=>(
                        <MenuItem key={key} value={value.id}>{value.value}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export {SelectList}