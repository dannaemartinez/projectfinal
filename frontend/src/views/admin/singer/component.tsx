import {
  Box,
  Button,
  Input,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Typography,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { useEffect, useState } from "react";
import { SimpleFileUpload } from 'formik-material-ui'
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import TableInfo from "../../../components/table/component";
import { singersSelector } from "../../../features/musicSlice";
import { fetchDeleteSinger, getSingers } from "../../../services/singer";
import { getBase64 } from "../../../helpers/files";
import { Field, Formik } from "formik";
import { styles } from "./styles";
import {
  createSinger,
  initialValuesUpdate,
  initialValuesCreate,
  validationSchemaCreate,
  validationSchemaUpdate,
  updateSinger,
  CreateSingerDTO,
  UpdateSingerDTO,
} from "./form";

const AdminSinger = () => {
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);
  const [initialEditValues, setInitialEditValues] = useState<UpdateSingerDTO | undefined>(undefined); 
  const dispatch = useDispatch();

  const singers = useAppSelector(singersSelector);

  useEffect(() => {
    dispatch(getSingers());
  }, [dispatch]);

  const passToCreate = (values: CreateSingerDTO) => {
    getBase64(values.image, (result) => {
      values.image = result;
      createSinger(values);
    });
  }

  const passToUpdate = (values: UpdateSingerDTO) => {
    if (editIndex !== undefined)
      updateSinger(values, {
        id: singers[editIndex].id,
        index: editIndex,
      });
  };

  return (
    <>
      <Typography variant="h2" sx={styles.title}>
        Administrador de cantantes.
      </Typography>{" "}
      <Box sx={styles.singerContainer}>
        <TableInfo
          rowsPerPageOptions={[5, 10, 15]}
          data={singers}
          columnsNames={["Id", "Nombre artistico", "Imagen", "Acciones"]}
          title="Cantantes"
          row={(item, index) => (
            <TableRow>
              <TableCell sx={styles.singerId}>{item.id}</TableCell>
              <TableCell sx={styles.singerField}>{item.stageName}</TableCell>
              <TableCell sx={styles.singerField}>{item.stageName}</TableCell>
              <TableCell sx={styles.singerActions}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(fetchDeleteSinger(item.id, index))}
                >
                  Eliminar
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => setEditIndex(index)}
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          )}
        />
        <Box sx={styles.formGroup}>
          <Box>
            <Typography variant="h5" sx={styles.title}>
              Crear un nuevo Cantante.
            </Typography>{" "}
            <Formik
              initialValues={initialValuesCreate}
              onSubmit={createSinger}
              validationSchema={validationSchemaCreate}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Paper elevation={6} sx={styles.formContainer}>
                    <TextField
                      label="Nombre"
                      error={Boolean(errors.name)}
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      helperText={errors.name}
                    />
                    <TextField
                      label="Alias"
                      error={Boolean(errors.stageName)}
                      name="stageName"
                      value={values.stageName}
                      onChange={handleChange}
                      helperText={errors.stageName}
                    />
                    <TextField
                      label="Apellido"
                      error={Boolean(errors.lastName)}
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      helperText={errors.lastName}
                    />
                    <TextField
                      label="Nacionalidad"
                      error={Boolean(errors.nationality)}
                      name="nationality"
                      value={values.nationality}
                      onChange={handleChange}
                      helperText={errors.nationality}
                    />
                    <TextField
                      label="Imagen"
                      error={Boolean(errors.image)}
                      name="image"
                      value={values.image}
                      onChange={handleChange}
                      helperText={errors.image}
                    />
                    <Button
                      sx={styles.formButton}
                      variant="contained"
                      color="success"
                      type="submit"
                    >
                      Crear
                    </Button>
                  </Paper>
                </form>
              )}
            </Formik>
          </Box>
          {editIndex !== undefined && (
            <Box>
              <Typography variant="h5" sx={styles.title}>
                {`Editar las canciones ${singers[editIndex].stageName}.`}
              </Typography>{" "}
              <Formik
                initialValues={initialValuesUpdate}
                onSubmit={passToUpdate}
                validationSchema={validationSchemaUpdate}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <form onSubmit={handleSubmit}>
                    <Paper elevation={6} sx={styles.formContainer}>
                      <TextField
                        label="Nombre"
                        error={Boolean(errors.description)}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        helperText={errors.description}
                      />
                      <Button
                        sx={styles.formButton}
                        variant="contained"
                        color="warning"
                        type="submit"
                      >
                        Editar
                      </Button>
                    </Paper>
                  </form>
                )}
              </Formik>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AdminSinger;