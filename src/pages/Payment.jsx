import _ from 'lodash';
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import { Tooltip } from "antd";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../style/pages/payment.scss"
import InputLabel from '@mui/material/InputLabel';
import MultipleSelectPlaceholder from '../components/SelectMultiple';

// hook
import { convertBase64 } from '../hooks/uploaderImage';
import TablePayment from '../components/Table';





/**
 * Form Validation Schema
 */
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
    accountName: "",
    remember: true,
};
// Group
const months = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
];

function Payment() {
    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors } = formState;

    // submit api
    const sendData = () => {
        axios.put(`http://localhost:8084/v1/payments`, { amount, coursePaymentMonth, receiptPaymentDate, courseId, accountId, receipt })
    }

    const [error,seterror]=useState(false)

    // search username
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8084/v1/accounts/?username=${username}`)
            setUser(response.data)
            setaccountId(response.data.id);
            seterror(false);
        }
        catch (error) {
            seterror(true);
        }
    };

    // Create api
    const [accountId, setaccountId] = useState("");
    const [errorAccounts,seterrorAccounts]=useState(false)
    const CreateAccount =async (e) => {
        e.preventDefault();
        try{
            await axios.put(`http://localhost:8084/v1/accounts`, {
                username,
                accountName,
                surname,
            }).then((response) => {
                setaccountId(response.data.id);
                seterror(false);

            })
        }
        catch(error){
            seterrorAccounts(true)
            console.log(error.response)
        }

    }

    // Create group
    const [group, setGroup] = useState({
        name: "",
    });

    const { name } = group;

    const [courseId, setGroupId] = useState("");
    const CreateGroup = () => {
        axios.put(`http://localhost:8084/v1/courses`, { name }).then(res => {
            setGroupId(res.data.id);
            
            if (true) {
                axios.get(`http://localhost:8084/v1/courses?name=${name}`).then((response) => {
                    setGroupId(response.data.id);
                    seterrorAccounts(false)
                })
            }
        })





    }

    const CreatGroupId = () => {
        axios.get(`http://localhost:8084/v1/courses?name=${name}`).then((response) => {
            setGroupId(response.data.id);
            seterrorAccounts(false)
        })

    }


    const [data, setData] = useState({
        amount: "",
        coursePaymentMonth: "",
        receiptPaymentDate: '',
        courseId: "",
        accountId: '',
        receipt: "",
    })

    const [user, setUser] = useState({
        accountName: "",
        username: "",
        surname: ""
    });

    const onHandleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setData({ ...data, [e.target.name]: e.target.value });
        setGroup({ ...group, [e.target.name]: e.target.value })
    };
    // image

    // image
    const [receipt, setReceipt] = useState({
        base64EncodedPhoto: "",
        photoName: "photo1",
    });

    const { base64EncodedPhoto } = receipt;
    const uploadImage = async (e) => {
        const imageTarget = e.target.files[0]
        const base64 = await convertBase64(imageTarget)
        setReceipt({ ...receipt, [e.target.name]: base64 })
    }




    const [errormessage, setErrormessage] = useState("")
    const { accountName, username, surname } = user;
    const { amount, coursePaymentMonth, receiptPaymentDate } = data;

    function getStyles(name, month, theme) {
        return {
            fontWeight:
                month.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }



    const theme = useTheme();
    const [month, setMonth] = React.useState([]);



    const [personName, setPersonName] = React.useState([]);
    const handleEventChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };




    return (
        <div className='form'>
            <h1 className="ingress py-[20px] px-0 font-bold leading-none text-2xl text-center text-neutral-400">
                Ingress Academy Payment System
            </h1>
            {/* <Link to="/table"
                className="text-white"
            >
                table sehifesine
            </Link> */}
            <div className='container'>
                <div className="all">
                    <form
                        name="loginForm"
                        noValidate
                    // onSubmit={handleSubmit(handleFormSubmit)}
                    >


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
                                            // eslint-disable-next-line eqeqeq
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
                        </div>
                        {error?
               <label className='username-error'>Ad və soyadı daxil edib Create Account düyməsinə click edin</label>:""}
                        <div className="all-left">
                            <div className="all-name-surname">

                                <Controller
                                    name="accountName"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="standard-start-adornment"
                                            type="text"
                                            placeholder="Name"
                                            className="w-[300px] rounded-3xl"
                                            value={user.accountName}
                                            error={!!errors.accountName}
                                            helperText={errors?.accountName?.message}
                                            variant="outlined"
                                            sx={{ marginBottom: "15px" }}
                                            required
                                            onChange={onHandleChange}
                                            onInput={(e) => {
                                                e.target.value
                                                    .toUpperCase()
                                                    .trim()
                                            }
                                            }
                                        />
                                    )}
                                />
                                <Controller
                                    name="surname"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="standard-start-adornment"
                                            type="text"
                                            placeholder="Surname"
                                            className="w-[300px]"
                                            value={user.surname}
                                            error={!!errors.surname}
                                            helperText={errors?.surname?.message}
                                            variant="outlined"
                                            sx={{ marginBottom: "15px" }}
                                            required
                                            onChange={onHandleChange}
                                            onInput={(e) => {
                                                e.target.value
                                                    .toUpperCase()
                                                    .trim()
                                            }
                                            }
                                        />
                                    )}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className="create-account"
                                    aria-label="Sign in"
                                    size="large"
                                    onClick={CreateAccount}
                                >
                                    Create account
                                </Button>
                            </div>
                        </div>
                        {errorAccounts?
               <label className='account-error'>Siz artiq qeydiyatdan kecmisiniz</label>:""}
                        <div className="all-right">


                            <div className='group'>
                                <Controller
                                    name="amount"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type="number"
                                            error={!!errors.amount}
                                            helperText={errors?.amount?.message}
                                            variant="outlined"
                                            className="w-[300px] outline-none px-[14px] h-[35px] mb-[12px] rounded-xl border-none border-solid border-[1px] border-[#c4c4c4]"
                                            required
                                            placeholder='Amount'
                                            value={amount}
                                            onChange={onHandleChange}
                                        />
                                    )}
                                />
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="standard-start-adornment"


                                            type="text"
                                            placeholder="Group-name"
                                            className="w-[300px] group"
                                            sx={{ marginBottom: "15px" }}
                                            error={!!errors.group}
                                            helperText={errors?.group?.message}
                                            variant="outlined"
                                            required
                                            value={name}
                                            onChange={onHandleChange}

                                        />
                                    )}
                                />
                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="search-group"
                                        onClick={CreatGroupId}
                                        sx={{ marginBottom: "15px" }}
                                    >
                                        Search
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className="h-[56px] w-[70px] my-[9px]"
                                        aria-label="Sign in"
                                        size="large"
                                        onClick={CreateGroup}
                                    >
                                        Create
                                    </Button>
                                </div>

                            </div>

                            <div className="date">

                                <Controller
                                    name="coursePaymentMonth"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="standard-start-adornment"
                                            type="text"
                                            placeholder="Month"
                                            className="w-[300px] outline-none px-[14px] h-[35px] mb-[12px] rounded-xl border-none border-solid border-[1px] border-[#c4c4c4]"
                                            value={coursePaymentMonth}
                                            error={!!errors.coursePaymentMonth}
                                            helperText={errors?.coursePaymentMonth?.message}
                                            variant="outlined"
                                            sx={{ marginBottom: "15px" }}
                                            required
                                            onChange={onHandleChange}
                                            onInput={(e) => {
                                                e.target.value
                                                    .toUpperCase()
                                                    .trim()
                                            }
                                            }
                                        />
                                    )}
                                />                                
                                <Controller
                                    name="date"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="standard-start-adornment"
                                            sx={{
                                                borderRadius: "12px",
                                                backgroundColor: "#fff",
                                                width: "300px",
                                            }}
                                            type="date"
                                            name="receiptPaymentDate"
                                            value={receiptPaymentDate}
                                            onChange={onHandleChange}
                                        />
                                    )}
                                />
                                <Button
                                    variant="contained"
                                    component="label"
                                    className="w-[140px] h-[55px]  text-center text-white image-button"
                                >
                                    Şəkil əlavə et
                                    <input hidden accept="image/*" multiple type="file" name='base64EncodedPhoto' onInput={uploadImage} />
                                </Button>
                            </div>

                            <div className="image">


                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className="h-[56px] w-[130px] my-[9px] submit"
                                    aria-label="Sign in"
                                    size="large"
                                    onClick={sendData}
                                >
                                    Submit
                                </Button>
                                <div className="h-[360px] w-[200px] photo">
                                {base64EncodedPhoto == "" ? "": <img src={base64EncodedPhoto} alt="" className="w-[100%] h-[100%] object-contain" />}
                            </div>
                            </div>

                           
                        </div>
                    </form>


                                            <TablePayment/>
                </div>
            </div >

        </div >
    );
};
export default Payment;
