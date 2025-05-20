"use client"

import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    Stack,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Drawer,
    IconButton,
    Typography,
} from '@mui/material';

const AddBook: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpen}
                sx={{ ml: 2 }}
            >
                Create user
            </Button>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={handleClose}
            >
                <Box sx={{ width: 400, p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Create a new account</Typography>
                        <IconButton onClick={handleClose}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                    <Stack spacing={3}>
                        <TextField
                            label="Name"
                            placeholder="Please enter user name"
                            fullWidth
                        />
                        <TextField
                            label="Url"
                            placeholder="Please enter domain"
                            fullWidth
                            InputProps={{
                                startAdornment: <Box sx={{ mr: 1 }}>http://</Box>,
                                endAdornment: <Box sx={{ ml: 1 }}>.com</Box>,
                            }}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Select Owner</InputLabel>
                            <Select
                                label="Select Owner"
                                defaultValue="lobo"
                            >
                                <MenuItem value="lobo">Lobo the Wolf</MenuItem>
                                <MenuItem value="cat">a cat</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Stack>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default AddBook;