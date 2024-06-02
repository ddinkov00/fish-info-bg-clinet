import { useState } from 'react';
import { Controller, Form, useForm } from 'react-hook-form';

import { LoginRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { nameof } from 'ts-simple-nameof';

import { handleLogin } from '@/utils/authenticationHelper';
import { Routes } from '@/utils/constants';

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { control, formState } = useForm<LoginFormData>({ mode: 'onSubmit' });
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
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
        <LoginRounded color="primary" sx={{ height: 100, width: 100 }} />

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
              <OutlinedInput id={nameof<LoginFormData>((x) => x.email)} label="Имейл" />
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

        <Box width="100%">
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!formState.isValid}
          >
            Вход
          </Button>

          <Box
            width="100%"
            marginTop="10px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="5px"
          >
            <Typography fontSize="small" color="black">
              Все още намаш акаунт?
            </Typography>
            <Button
              disableRipple
              variant="text"
              sx={{ padding: 0 }}
              onClick={() => router.push(Routes.register)}
            >
              <Typography fontSize="small" fontWeight="regular">
                Регистрирай се!
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Form>
  );
};
