import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { tokenSelector } from "../../features/authSlice";
import { Styles } from "../../theme/types";
// import { initialValues, loginUser, validationSchema } from "./form";

const Register = () => {
  const navigate = useNavigate();
//   const token = useAppSelector(tokenSelector);

//   useEffect(() => {
//     if (token !== undefined) navigate("/");
//   }, [navigate, token]);

  const styles: Styles = {
    registerContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    registerForm: {
      display: "flex",
      flexDirection: "column",
      width: "500px",
      height: "500px",
      padding: "20px",
      textAlign: "center",
    },
    title: {
      margin: "20px",
      fontFamily: "'Cedarville Cursive', cursive",
      fontWeight: "bold",
    },
    inputsContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      margin: "20px",
      flex: 1,
    },
  };

  return (
    <Box sx={styles.registerContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={createUser}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, values }) => (
          <form onSubmit={handleSubmit}>
            <Paper sx={styles.loginForm} elevation={6}>
              <Typography sx={styles.title} variant="h3">
                Rockstify
              </Typography>
              <Box sx={styles.inputsContainer}>
                <TextField
                  error={Boolean(errors.username)}
                  onChange={handleChange}
                  label="Nombre de Usuario"
                  name="username"
                  type="username"
                  helperText={errors.username}
                />
                <TextField
                  error={Boolean(errors.password)}
                  onChange={handleChange}
                  label="Contraseña"
                  name="password"
                  type="password"
                  helperText={errors.password}
                />
                <TextField
                  error={Boolean(errors.first_name)}
                  onChange={handleChange}
                  label="Nombre"
                  name="first_name"
                  type="first_name"
                  helperText={errors.first_name}
                />
                <TextField
                  error={Boolean(errors.last_name)}
                  onChange={handleChange}
                  label="Apellido"
                  name="last_name"
                  type="last_name"
                  helperText={errors.last_name}
                />
                <TextField
                  error={Boolean(errors.email)}
                  onChange={handleChange}
                  label="Emsil"
                  name="email"
                  type="email"
                  helperText={errors.email}
                />
                <Box>
                  <Button variant="contained" color="success" type="submit">
                    Registro
                  </Button>
                </Box>
              </Box>
            </Paper>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;