import { Grid } from '@mui/material';

import { RegisterForm } from '@/components/Authentication/RegisterForm';

const Register = () => {
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
        <RegisterForm />
      </Grid>
    </Grid>
  );
};

export default Register;
