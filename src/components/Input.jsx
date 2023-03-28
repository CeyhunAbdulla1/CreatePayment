import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields  ({type,label,className,name,value,onChange,placeholder,control}) {
  return (
    <Box
    
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          className={className}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          label={label}
          size="small"
        />
      </div>
    </Box>
  );
}