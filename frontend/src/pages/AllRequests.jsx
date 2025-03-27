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
import { getAllRequests } from '../services/requests';

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedRowId, setClickedRowId] = useState(null);

  // Get user role from local storage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userRole = user ? user.role : null;

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllRequests();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load requests');
        setLoading(false);
      }
    };

    // Only fetch requests if the user is an admin
    if (userRole === 'ADMIN') {
      fetchRequests();
    } else {
      setLoading(false); // Set loading to false if not an admin
    }
  }, [userRole]);

  const handleRowClick = (requestId) => {
    console.log(`Clicked request with ID: ${requestId}`);
    setClickedRowId(requestId);
  };

  // Render permission denied message if not an admin
  if (userRole !== 'ADMIN') {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          You do not have permission to view this page.
        </Typography>
      </Container>
    );
  }

  if (loading) {
    return <Typography variant="h6">Loading requests...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error loading requests: {error}</Typography>;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        View All Requests
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: 'lightblue' }}>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell align="right">Pet Name</TableCell> {/* Changed from Pet ID */}
              <TableCell align="right">Username</TableCell> {/* Changed from User ID */}
              <TableCell align="right">Request Date</TableCell>
              <TableCell>Message</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request.requestId}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  cursor: 'pointer',
                  ...(clickedRowId === request.requestId && {
                    backgroundColor: 'lightgray',
                  }),
                }}
                onClick={() => handleRowClick(request.requestId)}
              >
                <TableCell component="th" scope="row">
                  {request.requestId}
                </TableCell>
                <TableCell align="right">{request.pet.petName}</TableCell> {/* Display petName */}
                <TableCell align="right">{request.user.username}</TableCell> {/* Display username */}
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

export default AllRequests;