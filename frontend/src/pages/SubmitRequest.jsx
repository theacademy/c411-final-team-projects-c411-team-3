import React, { useState } from 'react';  // For React hooks
import { TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { createRequest } from "../services/request";
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

function SubmitRequest() {
    // State to handle form input values
    const [petId, setPetId] = useState('');
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoingBack, setIsGoingBack] = useState(false);
    const [error, setError] = useState(null);  // for error handling
    const [success, setSuccess] = useState(false); // for success message
    const navigate = useNavigate(); // to navigate to another page

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        const requestData = {
            petId: petId,
            userId: userId,
            message: message,
            requestDate: new Date().toISOString().split('T')[0], // current date
        };

        // api call
        try{
            const result = await createRequest(requestData);
            setSuccess(true);
            alert("Request submitted successfully!")
            navigate("/"); // return to the main page
        } catch(err){
            const errorMessage = typeof err === "string" ? err : err?.error || "Invalid Request";
            setError(errorMessage);
        } finally {
            setIsSubmitting(false); // reset state
        }
    };

    const handleReturn = (event) => {
        event.preventDefault();
        setIsGoingBack(true);
        navigate("/");
    }

    return (
        <ThemeProvider theme = {theme}>
        <div className="container" >
            <Box sx={{
                backgroundColor: '#f5f5f5',
                padding: '20px',
                border: '3px solid #618833',
                justifyContent: "center",
                display: 'flex', flexDirection: 'column', gap: '16px', alignItems: "center",
                width: '400px',
                marginBottom: '16px',
            }}>
            <h2 style={{ color: "#000" }}>Submit a Request</h2>
            <form onSubmit={handleSubmit}>
                {/* Pet ID Field */}
                <div className="form-field">
                    <TextField
                        label="Pet ID"
                        variant="outlined"
                        fullWidth
                        required
                        value={petId}
                        onChange={(e) => setPetId(e.target.value)}
                        placeholder="Enter Pet ID"
                        sx={{ marginBottom: '16px' }}
                    />
                </div>

                {/* User ID Field */}
                <div className="form-field">
                    <TextField
                        label="User ID"
                        variant="outlined"
                        fullWidth
                        required
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter User ID"
                        sx={{ marginBottom: '16px' }}
                    />
                </div>

                {/* Message Field */}
                <div className="form-field">
                    <TextField
                        label="Message"
                        variant="outlined"
                        fullWidth
                        required
                        multiline
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                        sx={{ marginBottom: '16px' }}
                    />
                </div>

                {/* Submit Button */}
                <div className="form-field">
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                </div>
            </form>
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

export default SubmitRequest;


