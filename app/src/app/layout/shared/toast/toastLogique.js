export const handleClick = (setOpen) => {
    setOpen(true);
};

export const handleClose = (event, reason, setOpen) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
};