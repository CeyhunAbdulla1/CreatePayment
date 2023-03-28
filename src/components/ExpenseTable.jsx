import * as React from 'react';

import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
      field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
      field: 'amount',
      headerName: 'courseGroup',
      width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'courseGroup',
    width: 150,
  editable: true,
},

];



export default function ExpenseTable() {
  
    const [user, setusername] = useState({
        name: "",
        amount: "",
        description:"",
        id:"",
      })
      const [reload,setReload]=useState(false);
    
      const{id}=useParams();
    
      const [data,setdata]=useState([])
        useEffect(()=>{
              axios.get("http://localhost:8084/v1/expense/all").then(res=>{
                    setdata(res.data.content)
                    setReload(!reload)
        })
    },[])

  return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          pagination={true}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
  
        />
      </Box>
    );}