
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Xananı boş saxlamayın !")
        .matches(
            /^((\+)?994(\s)?)?(5[015]|7[07]|99|10|60)(\s)?([0-9]{3})(\s)?([0-9]{2})(\s)?([0-9]{2})$/,
            "Mobil nömrənizi düz qeyd edin !"
        ),
    accountName: yup.string().required("Xanani bos saxlamayin"),
    surname: yup.string().required("Xanani bos saxlamayin"),

});

const defaultValues = {
    username: "",
    remember: true,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


// Custom

export default function TablePayment() {
    
    const { control, formState, handleSubmit, setError, setValue } = useForm({
                mode: "onChange",
                defaultValues,
                resolver: yupResolver(schema),
            });
            const { isValid, dirtyFields, errors } = formState;
            const [user,setUser]=useState([])

            const[ data,setData]=useState({
                username:"",
            })

                    const handleFormSubmit = async (e) => {
                        e.preventDefault();
                             await axios.get(`http://localhost:8084/v1/payments/search?username=${username}`).then(res=>{
                                setUser(res.data)
                                console.log(res.data)
                                setData(res.data)
                             }  )
                       
                      
                    };
                    
            const onHandleChange = (e) => {
                setData({ ...user, [e.target.name]: e.target.value });

            };
                    const {  username } = data;
  return (
    <div>
           <Controller
                       name="username"
                       control={control}
                       render={({ field }) => (
                           <TextField
                               {...field}
                               id="standard-start-adornment"
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">+994</InputAdornment>
                                   ),
                               }}
                               type="number"
                               placeholder="XX-XXX-XX-XX"
                               className="w-[450px] username"
                               value={username}
                               sx={{ marginBottom: "15px" }}
                               error={!!errors.username}
                               helperText={errors?.username?.message}
                               variant="outlined"
                               required
                               onChange={onHandleChange}
                               onInput={(e) => {
                                   // eslint-disable-next-line 
                                   if (e.target.value.length == 0) {
                                       e.target.value = "";
                                   } else {
                                       e.target.value = Math.max(0, e.target.value)
                                           .toString()
                                           .slice(0, 9);
                                   }
                               }}
                           />
                       )}
                />
                                                                              <Button
                                                                                variant="contained"
                                                                                color="primary"
                                                                                className="h-[55px] w-[80px] search"
                                                                                type="submit"
                                                                                onClick={handleFormSubmit}
                                                                                sx={{ marginBottom: "15px" }}
                                                                                >
                                                                                Search
                                                                                </Button>
    <TableContainer component={Paper}>
        
      <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className='w-10' align="right">Name&nbsp;</StyledTableCell>
            <StyledTableCell className='w-10' align="right">Surname&nbsp;</StyledTableCell>
            <StyledTableCell className='w-10' align="right">Amount&nbsp;</StyledTableCell>
            <StyledTableCell className='w-10' align="right">Coursename&nbsp;</StyledTableCell>
            <StyledTableCell className='w-10' align="right">receiptPaymentdate&nbsp;</StyledTableCell>
            <StyledTableCell className='w-10' align="right">coursePaymentMonth&nbsp;</StyledTableCell>
            <StyledTableCell className='w-10' align="right">Imagename&nbsp;</StyledTableCell>
            <StyledTableCell className='w-10' align="right">Action&nbsp;</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((row) => (
            <StyledTableRow key={row.id}>

              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.surname}</StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell align="right">{row.courseName}</StyledTableCell>
              <StyledTableCell align="right">{row.receiptPaymentDate}</StyledTableCell>
              <StyledTableCell align="right">{row.coursePaymentMonth}</StyledTableCell>
              <StyledTableCell align="right">{row.receiptName}</StyledTableCell>
              <StyledTableCell align="right"> <Link to="/paymentedits"><i className="fa-regular fa-pen-to-square"></i></Link></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}








// // import React from 'react'
// // import { useState,useEffect } from 'react';
// // import { Controller, useForm } from "react-hook-form";
// // import InputAdornment from "@mui/material/InputAdornment";
// // import { yupResolver } from "@hookform/resolvers/yup";
// // import TextField from "@mui/material/TextField";
// // import * as yup from "yup";
// // import Button from "@mui/material/Button";

// // import axios from 'axios';
// // import "../style/pages/table.css"


// // const schema = yup.object().shape({
// //     username: yup
// //         .string()
// //         .required("Xananı boş saxlamayın !")
// //         .matches(
// //             /^((\+)?994(\s)?)?(5[015]|7[07]|99|10|60)(\s)?([0-9]{3})(\s)?([0-9]{2})(\s)?([0-9]{2})$/,
// //             "Mobil nömrənizi düz qeyd edin !"
// //         ),
// //     accountName: yup.string().required("Xanani bos saxlamayin"),
// //     surname: yup.string().required("Xanani bos saxlamayin"),

// // });

// // const defaultValues = {
// //     username: "",
// //     accountName: "",
// //     remember: true,
// // };
// // function TablePayment() {
// //     const { control, formState, handleSubmit, setError, setValue } = useForm({
// //         mode: "onChange",
// //         defaultValues,
// //         resolver: yupResolver(schema),
// //     });

// //     const { isValid, dirtyFields, errors } = formState;
// //     const [user,setUser]=useState([])
// //     const { accountName, username, surname } = user;

// //     const [search,setSearch]=useState('')
// //     useEffect(() => {
// //         axios.get("http://localhost:8084/v1/payments/all").then(res=>{
// //         setUser(res.data)
// //         })
// //     }, [])

// //     const onHandleChange = (e) => {
// //         setUser({ ...user, [e.target.name]: e.target.value });
// //     };
// //     const handleFormSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const response = await axios.get(`http://localhost:8084/v1/accounts/?username=${username}`)
       
// //         }
// //         catch (error) {
// //         }
// //     };
// //     const propertyValues=Object.entrieszz(user);  
// //   return (
// //     <div>
// //          <Controller
// //                                 name="username"
// //                                 control={control}
// //                                 render={({ field }) => (
// //                                     <TextField
// //                                         {...field}
// //                                         id="standard-start-adornment"
// //                                         InputProps={{
// //                                             startAdornment: (
// //                                                 <InputAdornment position="start">+994</InputAdornment>
// //                                             ),
// //                                         }}
// //                                         type="number"
// //                                         placeholder="XX-XXX-XX-XX"
// //                                         className="w-[450px] username"
// //                                         value={username}
// //                                         sx={{ marginBottom: "15px" }}
// //                                         error={!!errors.username}
// //                                         helperText={errors?.username?.message}
// //                                         variant="outlined"
// //                                         required
// //                                         onChange={onHandleChange}
// //                                         onInput={(e) => {
// //                                             // eslint-disable-next-line eqeqeq
// //                                             if (e.target.value.length == 0) {
// //                                                 e.target.value = "";
// //                                             } else {
// //                                                 e.target.value = Math.max(0, e.target.value)
// //                                                     .toString()
// //                                                     .slice(0, 9);
// //                                             }
// //                                         }}
// //                                     />
// //                                 )}
// //                             />
// //                               <Button
// //                                 variant="contained"
// //                                 color="primary"
// //                                 className="h-[55px] w-[80px] search"
// //                                 type="submit"
// //                                 onClick={handleFormSubmit}
// //                                 sx={{ marginBottom: "15px" }}
// //                             >
// //                                 Search
// //                             </Button>
// //         <table>
// //     <tr>
// //       <th>Name</th>
// //       <th>Surname</th>
// //       <th>Amount</th>
// //       <th>Coursename</th>
// //       <th>receiptPaymentdate</th>
// //       <th>coursePaymentMonth</th>
// //       <th>Imagename</th>
// //     </tr>
// //     {
// //          propertyValues.map(item=>(
// //             console.log(item)
// //             // <tr key={item.id}>
// //             //     <tr>{item.amount}</tr>
// //             //     <tr>{item.coursePaymentMonth}</tr>
// //             //     <tr>{item.receiptPaymentDate}</tr>
// //             //     <tr>{item.accountId}</tr>  

// //             // </tr>
// //          )


// //             )
// //     }
// //   </table></div>
// //   )
// // }

// // export default TablePayment