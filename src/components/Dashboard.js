import React from "react";
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';


function Dashboard({ children }) {

  const navigate = useNavigate();

  return (
    <div>
      <Box className="component-title">Dashboard</Box>
      <Box className="outlet-box">
        <Box>
            
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
