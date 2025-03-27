import React, { useState } from 'react';  // For React hooks
import { TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Typography, Stack } from '@mui/material';
import { updateRequest, viewRequest, cancelRequest } from "../services/request";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            light: '#618833',
            main: '#8bc34a',
            dark: '#a2cf6e',
            contrastText: '#fff',
        },
        secondary: {
            light: '#007bb2',
            main: '#00b0ff',
            dark: '#33bfff',
            contrastText: '#000',
        },
    },
});

function ViewRequest() {
    const [requestId, setRequestId] = useState('');
    const [request, setRequest] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [isGoingBack, setIsGoingBack] = useState(false); // to return to main menu
    const [isUpdating, setIsUpdating] = useState(false); // to update request
    const [isCanceling, setIsCanceling] = useState(false); // to cancel request
    const [error, setError] = useState(null); // in case there is an error
    const [success, setSuccess] = useState(false); // for success message
    const navigate = useNavigate(); // to navigate to another page
    const [newStatus, setNewStatus] = useState('');  // Store the updated message
    const [isEditing, setIsEditing] = useState(false);

    // get info from local storage
    const user = localStorage.getItem("user");
    const role = user?.role;

    const fetchRequestById = async (id) => {
        setIsFetching(true);
        setError(null);
        setSuccess(false);

        // api call
        try{
            const data = await viewRequest(id);
            console.log(data);
            setSuccess(true);
            setRequest(data);
            setRequestId(id);
            setIsFetching(false);
        }catch(err){
            const errorMessage = typeof err === "string" ? err : err?.error || "Invalid Request";
            setError(errorMessage);
        }
    };

    // Handle fetch Request action
    const handleFetchRequest = (event) => {
        event.preventDefault();
        if (requestId.trim() === '') {
            alert('Please enter a valid Request ID.');
        } else {
            console.log('Fetching request with ID:', requestId);
            fetchRequestById(requestId);  //get request by the ID
        }
    };

    const handleReturn = (event) => {
        event.preventDefault();
        setIsGoingBack(true);
        navigate("/pets");
    }

    const handleCancelRequest = async (event) => {
        event.preventDefault();
        setIsCanceling(true);
        if (!request.requestId) {
            alert("Request ID is missing.");
            return;
        }

        try{
            const data = await cancelRequest(request.requestId);
            setIsCanceling(false);
            alert("Request deleted successfully!")
            navigate("/pets"); // return to the main page
        }catch(err){
            const errorMessage = typeof err === "string" ? err : err?.error || "Error canceling request";
            setError(errorMessage);
        }

    }

    const handleUpdateRequest = async (event) => {
        event.preventDefault();
        setIsUpdating(true);

        try{
            const data = await updateRequest(request.requestId, request.petId, newStatus);
            setIsUpdating(false);
            alert("Request updated successfully!")
            navigate("/"); // return to the main page
        }catch(err){
            const errorMessage = typeof err === "string" ? err : err?.error || "Error canceling request";
            setError(errorMessage);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="container" sx={{
            }}>
                <Box
                    sx={{
                        backgroundColor: '#f5f5f5',
                        padding: '20px',
                        border: '3px solid #618833',
                        flexDirection: 'column',
                        gap: '16px',
                        justifyContent: "center",
                        alignItems: "center",
                        width: '400px',
                        display: 'flex',
                        marginBottom: '16px',
                    }}
                >
                    <h2 style={{ color: "#000" }}>View Request By ID</h2>

                    {/* Request ID Input Field */}
                    <div className="form-field">
                        <TextField
                            label="Enter Request ID"
                            variant="outlined"
                            fullWidth
                            value={requestId}
                            onChange={(e) => setRequestId(e.target.value)}
                            placeholder="Enter Request ID"
                            sx={{ marginBottom: '16px' }}
                        />
                    </div>

                    {/* Fetch Request Button */}
                    <div className="form-field">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleFetchRequest}
                            disabled={isFetching}
                        >
                            {isFetching ? 'Fetching...' : 'Fetch Request'}
                        </Button>
                    </div>

                    {/* Display the Request if available */}
                    {request &&  !isEditing && (
                        <Box
                            sx={{
                                marginTop: '20px',
                                padding: '16px',
                                border: '1px solid #618833',
                                backgroundColor: '#f0f0f0',
                                color: "#000"
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Request Details</Typography>
                            <Typography><strong>Request ID:</strong> {request.requestId}</Typography>
                            <Typography><strong>Pet ID:</strong> {request.pet.petId}</Typography>
                            <Typography><strong>User ID:</strong> {request.user.id}</Typography>
                            <Typography><strong>Message:</strong> {request.message}</Typography>
                            <Typography><strong>Date:</strong> {request.requestDate}</Typography>
                            <Typography><strong>Status:</strong> {request.status}</Typography>

                            <Stack direction="row" spacing = {2}>
                                <Button variant="contained"
                                        color="primary"
                                        onClick={handleCancelRequest}
                                        disabled={isCanceling}>
                                    {isCanceling ? 'Canceling Request...' : 'Cancel Request'}
                                </Button>
                                {role === user.role.ADMIN && (
                                    <Button variant="contained"
                                            color="primary"
                                            onClick={() => setIsEditing(true)} // Start editing
                                            disabled={isUpdating}>
                                        {isUpdating ? 'Updating Request...' : 'Update Request'}
                                    </Button>
                                )}
                            </Stack>
                        </Box>

                    )}


                    {isEditing && request && (
                        <Box sx={{
                            marginTop: '20px',
                            padding: '16px',
                            border: '1px solid #618833',
                            backgroundColor: '#f0f0f0',
                            color: "#000"
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Edit Request</Typography>
                            <div className="form-field">
                                <TextField
                                    label="Status"
                                    variant="outlined"
                                    fullWidth
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    sx={{ marginBottom: '16px' }}
                                />
                            </div>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpdateRequest}
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? 'Updating...' : 'Submit Update'}
                                </Button>
                                {role === "ADMIN" && (
                                    <Button variant="contained"
                                            color="primary"
                                            onClick={() => setIsEditing(true)} // Start editing
                                            disabled={isUpdating}>
                                        {isUpdating ? 'Updating Request...' : 'Update Request'}
                                    </Button>
                                )}
                            </Stack>
                        </Box>
                    )}




                </Box>
            </div>
            <div>
                <Box sx = {{justifyContent: "center",
                    alignItems: "center",
                    display: 'flex',}}>
                    <Button
                        type="Return"
                        color="primary"
                        variant="outlined"
                        onClick={handleReturn}
                        disabled={isGoingBack}>
                        {isGoingBack ? 'Bye Bye...' : 'Return to Main Menu'}
                    </Button>
                </Box>
            </div>

        </ThemeProvider>
    );
}

export default ViewRequest;