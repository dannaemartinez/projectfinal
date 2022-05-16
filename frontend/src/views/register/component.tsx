import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { tokenSelector } from "../../features/authSlice";
import { Styles } from "../../theme/types";
import { darkTheme } from "../../theme/theme"
import { initialValues, createUser, validationSchema } from "./form";
import {styles} from "./styles"

const Register = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography sx={styles.title} variant="h3">
        Ninja
      </Typography>
      <Box sx={styles.registerContainer}>
        <Box sx={styles.formGroup}>
          <Box>
            <Typography variant="h5" sx={styles.title}>
              Crear un nuevo Usuario.
            </Typography>{" "}

            <Formik
              initialValues={initialValues}
              onSubmit={createUser}
              validationSchema={validationSchema}
            >
              {({ handleChange, handleSubmit, errors, values }) => (
                <form onSubmit={handleSubmit}>
                  <Paper elevation={6} sx={styles.formContainer}>
                    <TextField
                      sx={styles.formInput}
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
                      sx={styles.formInput}
                      helperText={errors.password}
                    />
                    <TextField
                      error={Boolean(errors.firstName)}
                      onChange={handleChange}
                      label="Nombre"
                      name="firstName"
                      type="firstName"
                      sx={styles.formInput}
                      helperText={errors.firstName}
                    />
                    <TextField
                      sx={styles.formInput}
                      label="Apellido"
                      error={Boolean(errors.lastName)}
                      name="lastName"
                      onChange={handleChange}
                      type="lastName"
                      helperText={errors.lastName}
                    />
                    <TextField
                      error={Boolean(errors.email)}
                      onChange={handleChange}
                      label="Email"
                      name="email"
                      type="email"
                      sx={styles.formInput}
                      helperText={errors.email}
                    />
                    <Box>
                      <Button
                        sx={styles.formButton}
                        variant="contained" color="success" type="submit">
                        Registro
                      </Button>
                    </Box>
                  </Paper>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;