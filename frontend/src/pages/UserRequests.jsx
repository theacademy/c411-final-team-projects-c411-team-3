import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { viewRequestByUserId, cancelRequest } from '../services/request';

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [requestIdToDelete, setRequestIdToDelete] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    setUserId(user?.id);
  }, []);

  useEffect(() => {
    const fetchUserRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        if (userId) {
          const data = await viewRequestByUserId(userId);
          setRequests(data);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load your requests');
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserRequests();
    } else if (userId === null && !loading) {
      setLoading(false);
      setError("User not logged in or user ID not found.");
    }
  }, [userId]);

  const handleCancelClick = (requestId) => {
    setRequestIdToDelete(requestId);
    setIsConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    setRequestIdToDelete(null);
  };

  const handleCancelConfirm = async () => {
    setIsConfirmationOpen(false);
    try {
      await cancelRequest(requestIdToDelete);
      // Remove the deleted request from the state to update the UI
      setRequests(requests.filter((request) => request.requestId !== requestIdToDelete));
      setRequestIdToDelete(null);
      // Optionally, show a success message
      console.log(`Request with ID ${requestIdToDelete} cancelled successfully.`);
    } catch (err) {
      setError(err.message || 'Failed to cancel the request.');
      console.error("Error cancelling request:", err);
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading your requests...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error loading your requests: {error}</Typography>;
  }

  if (!userId) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          User not logged in or user ID not found.
        </Typography>
      </Container>
    );
  }

  if (requests.length === 0) {
    return <Typography variant="body1">You haven't made any requests yet.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Adoption Requests
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: 'lightblue' }}>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell align="right">Pet Name</TableCell>
              <TableCell align="right">Request Date</TableCell>
              <TableCell>Message</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell> {/* New column for the cancel button */}
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.requestId}>
                <TableCell component="th" scope="row">
                  {request.requestId}
                </TableCell>
                <TableCell align="right">{request.pet.petName}</TableCell>
                <TableCell align="right">{request.requestDate}</TableCell>
                <TableCell>{request.message}</TableCell>
                <TableCell align="right">{request.status}</TableCell>
                <TableCell align="right">
                  <Button
                    color="secondary"
                    size="small"
                    onClick={() => handleCancelClick(request.requestId)}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmationOpen}
        onClose={handleConfirmationClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Cancellation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel this request? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="primary">
            No
          </Button>
          <Button onClick={handleCancelConfirm} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserRequests;