import { Grid } from '@mui/material';

import { LoginForm } from '../components/Authentication/LoginForm';

const Login = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      color="whitesmoke"
      height="100vh"
    >
      <Grid item>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default Login;
