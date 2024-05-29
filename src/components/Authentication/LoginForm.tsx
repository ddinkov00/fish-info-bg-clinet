import { useState } from 'react';
import { Form, useForm } from 'react-hook-form';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { nameof } from 'ts-simple-nameof';

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { control } = useForm<LoginFormData>({ mode: 'onSubmit' });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <Form control={control} onSubmit={(data) => onSubmit(data.data)}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="40px"
        width="400px"
        padding="20px"
      >
        <AccountCircleRoundedIcon color="primary" sx={{ height: 100, width: 100 }} />

        <FormControl variant="outlined" fullWidth>
          <InputLabel>Имейл</InputLabel>
          <OutlinedInput id={nameof<LoginFormData>((x) => x.email)} label="Имейл" />
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <InputLabel>Парола</InputLabel>
          <OutlinedInput
            id={nameof<LoginFormData>((x) => x.password)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Парола"
          />
        </FormControl>

        <Button fullWidth size="large" variant="contained" color="primary">
          Вход
        </Button>
      </Box>
    </Form>
  );
};
