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
} from '@mui/material';
import { viewRequestByUserId } from '../services/request';

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user ID from local storage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user ? user.id : null; // Assuming your User object has an 'id' property

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
    } else {
      setLoading(false);
      setError("User ID not found. Please log in again.");
    }
  }, [userId]);

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserRequests;