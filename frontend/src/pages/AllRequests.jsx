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
import {updateRequest, UpdateRequest} from '../services/request';
import { Button } from '@mui/material';

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [clickedRowPetId, setClickedRowPetId] = useState(null);

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

  const handleRowClick = (requestId, petId) => {
    console.log(`Clicked request with RequestID: ${requestId}`);
    console.log(`Clicked request with petID: ${petId}`);
    setClickedRowId(requestId);
    setClickedRowPetId(petId);
  };

  const handleApprove = async (requestId, petId) => {
    // update the status to 'APPROVED' when they click approve button
    const updatedStatus = 'APPROVED';
    console.log(`Request ID: ${requestId}, Pet ID: ${petId}`);
    console.log(`status: ${updatedStatus}`);
    try{
      const data = await updateRequest(requestId, petId, updatedStatus);
      // Upon success, update the frontend state
      setRequests((prevRequests) =>
          prevRequests.map((request) =>
              request.requestId === requestId ? { ...request, status: updatedStatus } : request
          )
      );
      alert('Request approved successfully!');
    }catch(err){
      const errorMessage = typeof err === "string" ? err : err?.error || "Error canceling request";
      setError(errorMessage);
    }

  };

  const handleReject = async (requestId, petId) => {
    // update the status to 'REJECTED' when they click the reject button
    const updatedStatus = 'REJECTED';

    try {
      // Assuming updateRequest is a function that sends an API request to update the status
      const data = await updateRequest(requestId, petId, updatedStatus);
      // Upon success, update the frontend state
      setRequests((prevRequests) =>
          prevRequests.map((request) =>
              request.requestId === requestId ? { ...request, status: updatedStatus } : request
          )
      );
      alert('Request rejected successfully!');
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : err?.error || 'Error rejecting request';
      setError(errorMessage);
    }
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
              <TableCell align="center" sx = {{width:"200px"}}>Edit Status</TableCell>
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
                onClick={() => handleRowClick(request.requestId, request.pet.petId)}
              >
                <TableCell component="th" scope="row">
                  {request.requestId}
                </TableCell>
                <TableCell align="right">{request.pet.petName}</TableCell> {/* Display petName */}
                <TableCell align="right">{request.user.username}</TableCell> {/* Display username */}
                <TableCell align="right">{request.requestDate}</TableCell>
                <TableCell>{request.message}</TableCell>
                <TableCell align="right">{request.status}</TableCell>

                <TableCell align="right" sx = {{width:"200px"}}>
                  {request.status === 'PENDING' && (
                      <>
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click from triggering
                              handleApprove(request.requestId, request.pet.petId);
                            }}
                            sx={{ marginRight: '8px' }}
                        >
                          Approve
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click from triggering
                              handleReject(request.requestId, request.pet.petId);
                            }}
                        >
                          Reject
                        </Button>
                      </>
                  )}

                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllRequests;