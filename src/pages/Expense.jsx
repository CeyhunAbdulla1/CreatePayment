import React from 'react'
import axios from 'axios'
import "../style/pages/expense.scss"
import * as yup from "yup";
import Swal from 'sweetalert2';
import ExpenseTable from '../components/ExpenseTable';
import { useState } from 'react'
import TextField from "@mui/material/TextField";
import { useForm,Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    amount: yup
      .string()
      .required("Xananı boş saxlamayın !")
    //   .matches(
    //     /^((\+)?994(\s)?)?(5[015]|7[07]|99|10|60)(\s)?([0-9]{3})(\s)?([0-9]{2})(\s)?([0-9]{2})$/,
    //     "Mobil nömrənizi düz qeyd edin !"
    //   )
    ,
    name: yup.string().required("Xanani bos saxlamayin"),
    description:yup.string().required("Xanani bos saxlamayin"),
  });
  const defaultValues = {
    name: "",
    amount: "",
    description:"",
    remember: true,
  };




const Expense = () => {
    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema),
      });

      const { isValid, dirtyFields, errors } = formState;


    const [user, setusername] = useState({
        amount: "",
        name: "",
        description:"",
    })
 
    const onSubmit = ({name,amount,description}) => {
        axios.put("http://localhost:8084/v1/expense", { name, description,amount }).then(res => {
            console.log(res)
            Swal.fire('Alert text')
    
          // or an example from the picture above
          Swal.fire( '','Qeydiyatdan kecdiniz','success'); 
        })
        
    }
    const { name, description,amount } = user;
    return (
        <div className="createExpense">
            <div className="container">
          <div className="name-expense">

          
        <form className="flex flex-col justify-center w-full mt-32 w-52 ml-96"
        name="loginForm"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      > <h1>Course Register</h1>
        <div className="expensename">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-34"
              label="Expense name"
              type="text"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />
        </div>
        <div className="expense-amount">
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              id="standard-start-adornment"
            //   InputProps={{
            //     startAdornment: (
            //       <InputAdornment position="start">+994</InputAdornment>
            //     ),
            //   }}
              label="Amount"
              type="number"
              error={!!errors.amount}
              helperText={errors?.amount?.message}
              variant="outlined"
              required
              fullWidth
              onInput={(e) => {
                // eslint-disable-next-line eqeqeq
                if (e.target.value.length == 0) {
                  e.target.value = "";
                } else {
                  e.target.value = Math.max(0, e.target.value)
                    .toString()
                    .slice(0, 6);
                }
              }}
            />
          )}
        />
        </div>
        <div className="expensename">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-34"
              label="Description"
              type="text"
              error={!!errors.description}
              helperText={errors?.description?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />
        </div>
        <button
          variant="contained"
          color="secondary"
          className=" w-full mt-16"
          aria-label="Sign in"
        //   disabled={_.isEmpty(dirtyFields) || !isValid}
          type="submit"
          size="large"
        >
          Daxil ol
        </button>
      </form>
      </div>
      <div className="table">
            <ExpenseTable/>
      </div>
      </div>
      </div>
    )

}
export default Expense