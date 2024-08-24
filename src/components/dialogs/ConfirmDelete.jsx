import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Typography
} from '@mui/material'
import React from 'react'

const ConfirmDelete = ({ confirmDelete, closeconfirmDelete, deleteHandler }) => {
    return (
        <Dialog open={confirmDelete} onClose={closeconfirmDelete}>
            <DialogTitle>Confirm Delete</DialogTitle>

            <Typography variant='h6' padding={"1rem"}>Are you sure you want to delete this group?</Typography>
            <DialogActions>
                <Button onClick={closeconfirmDelete}>No</Button>
                <Button onClick={deleteHandler} color="error">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDelete