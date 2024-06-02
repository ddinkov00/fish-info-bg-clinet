import { useState } from 'react';
import { Controller, Form, useForm, useWatch } from 'react-hook-form';

import { AppRegistrationRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

import { register } from '@/api/identityController';
import { RegisterRequest } from '@/api/types/identity';
import { handleLogin } from '@/utils/authenticationHelper';

type RegisterFormData = {
  email: string;
  password: string;
  reTypePassword: string;
};

export const RegisterForm = () => {
  const { control, formState } = useForm<RegisterFormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showReTypePassword, setShowReTypePassword] = useState(false);

  const password = useWatch({ control, name: 'password' });

  const onSubmit = async (data: RegisterFormData) => {
    const registerRequest: RegisterRequest = {
      email: data.email,
      password: data.password,
    };

    await register(registerRequest);
    await handleLogin(data.email, data.password);
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
        <AppRegistrationRounded color="primary" sx={{ height: 100, width: 100 }} />

        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Моля въведете валиден имейл адрес!',
            },
          }}
          render={({ field }) => (
            <FormControl {...field} variant="outlined" fullWidth>
              <InputLabel>Имейл</InputLabel>
              <OutlinedInput label="Имейл" />
            </FormControl>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: true, minLength: 8 }}
          render={({ field }) => (
            <FormControl {...field} variant="outlined" fullWidth>
              <InputLabel>Парола</InputLabel>
              <OutlinedInput
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
          )}
        />

        <Controller
          name="reTypePassword"
          control={control}
          rules={{
            required: true,
            validate: {
              doesMath: (value) => value === password,
            },
          }}
          render={({ field }) => (
            <FormControl {...field} variant="outlined" fullWidth>
              <InputLabel>Потвърди парола</InputLabel>
              <OutlinedInput
                type={showReTypePassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowReTypePassword(!showReTypePassword)}>
                      {showReTypePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Потвърди парола"
              />
            </FormControl>
          )}
        />

        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          type="submit"
          disabled={!formState.isValid}
        >
          Регистрация
        </Button>
      </Box>
    </Form>
  );
};
