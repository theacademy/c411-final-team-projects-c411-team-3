import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from '@mui/material';

const AllRequests = () => {
  // Sample request data (same as before)
  const sampleRequests = [
    {
      requestId: 1,
      pet: { petId: 101 },
      user: { id: 201 },
      requestDate: '2025-03-27',
      message: 'Interested in adopting this cute dog!',
      status: 'PENDING',
    },
    {
      requestId: 2,
      pet: { petId: 102 },
      user: { id: 202 },
      requestDate: '2025-03-28',
      message: 'We have a loving home for this cat.',
      status: 'APPROVED',
    },
    {
      requestId: 3,
      pet: { petId: 103 },
      user: { id: 201 },
      requestDate: '2025-03-29',
      message: 'Looking for a playful companion.',
      status: 'REJECTED',
    },
  ];

  const [clickedRowId, setClickedRowId] = useState(null);

  const handleRowClick = (requestId) => {
    console.log(`Clicked request with ID: ${requestId}`);
    setClickedRowId(requestId);

    // Optionally, you can remove the visual feedback after a short delay
    // setTimeout(() => setClickedRowId(null), 300);
  };

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: 'lightblue' }}>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell align="right">Pet ID</TableCell>
              <TableCell align="right">User ID</TableCell>
              <TableCell align="right">Request Date</TableCell>
              <TableCell>Message</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleRequests.map((request) => (
              <TableRow
                key={request.requestId}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  cursor: 'pointer',
                  ...(clickedRowId === request.requestId && { // Apply style if this row is clicked
                    backgroundColor: 'lightgray',
                  }),
                }}
                onClick={() => handleRowClick(request.requestId)}
              >
                <TableCell component="th" scope="row">
                  {request.requestId}
                </TableCell>
                <TableCell align="right">{request.pet.petId}</TableCell>
                <TableCell align="right">{request.user.id}</TableCell>
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