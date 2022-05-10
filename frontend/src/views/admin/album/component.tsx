import {
  Box,
  Button,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Typography,
  Input,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { SimpleFileUpload } from 'formik-material-ui'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import TableInfo from "../../../components/table/component";
import { albumsSelector, singersSelector, genresSelector } from "../../../features/musicSlice";
import { fetchDeleteAlbum, getAlbums } from "../../../services/album";
import { getSingers } from "../../../services/singer";
import { getGenres } from "../../../services/genre";
import { getBase64 } from "../../../helpers/files";
import { Field, Formik } from "formik";
import { styles } from "./styles";
import {
  createAlbum,
  initialValuesUpdate,
  initialValuesCreate,
  validationSchemaCreate,
  validationSchemaUpdate,
  updateAlbum,
  UpdateAlbumDTO,
  CreateAlbumDTO,
} from "./form";

const AdminAlbum = () => {
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);
  // const [initialEditValues, setInitialEditValues] = useState<UpdateAlbumDTO | undefined>(undefined);
  const dispatch = useDispatch();

  const singers = useAppSelector(singersSelector);
  const genres = useAppSelector(genresSelector);
  const albums = useAppSelector(albumsSelector);

  useEffect(() => {
    dispatch(getAlbums());
    dispatch(getSingers());
    dispatch(getGenres());
  }, [dispatch]);

  const passToCreate = (values: CreateAlbumDTO) => {
    getBase64(values.image, (result) => {
      values.image = result;
      createAlbum(values);
    });
  }

  const passToUpdate = (values: UpdateAlbumDTO) => {
    if (editIndex !== undefined)
      updateAlbum(values, {
        id: albums[editIndex].id,
        index: editIndex,
      });
  };
  return (
    <>
      <Typography variant="h2" sx={styles.title}>
        Administrador de Albums.
      </Typography>{" "}
      <Box sx={styles.albumContainer}>
        <TableInfo
          rowsPerPageOptions={[5, 10, 15]}
          data={albums}
          columnsNames={["Id", "Nombre", "Acciones"]}
          title="Albums"
          row={(item, index) => (
            <TableRow>
              <TableCell sx={styles.albumId}>{item.id}</TableCell>
              <TableCell sx={styles.albumField}>{item.name}</TableCell>
              <TableCell sx={styles.albumActions}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(fetchDeleteAlbum(item.id, index))}
                >
                  Eliminar
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    // console.log("ITEM SELECTED TO EDIT========>", item)
                    setEditIndex(index);
                    // setInitialEditValues(item)
                  }}
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
              Crear un nuevo Album.
            </Typography>{" "}
            <Formik
              initialValues={initialValuesCreate}
              onSubmit={passToCreate}
              validationSchema={validationSchemaCreate}
            >
              {({ handleSubmit, handleChange, values, errors, isValid, dirty }) => (
                <form onSubmit={handleSubmit}>
                  <Paper elevation={6} sx={styles.formContainer}>
                    <TextField
                      sx={styles.formInput}
                      label="Nombre"
                      error={Boolean(errors.name)}
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      helperText={errors.name}
                    />

                    <Field
                      name="image"
                      type="file"
                      component={SimpleFileUpload}
                      // accept={acceptFileType}
                      inputProps={{
                        accept:
                          "image/jpeg",
                      }}
                    />

                    <TextField
                      sx={styles.formInput}
                      label="Precio físico"
                      error={Boolean(errors.physicalPrice)}
                      name="physicalPrice"
                      value={values.physicalPrice}
                      onChange={handleChange}
                      helperText={errors.physicalPrice}
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />

                    <TextField
                      sx={styles.formInput}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      label="Fecha de lanzamiento"
                      error={Boolean(errors.releaseDate)}
                      name="releaseDate"
                      value={values.releaseDate}
                      onChange={handleChange}
                      helperText={errors.releaseDate}
                      type="date"
                    />

                    <FormControl fullWidth sx={styles.formInput}>
                      <InputLabel id="demo-simple-select-label">Género</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        name="genre.id"
                        id="demo-simple-select"
                        value={values.genre.id}
                        label="Género"
                        onChange={handleChange}
                        helperText={errors.genre?.id}
                      >
                        <MenuItem disabled value={undefined}>
                          <em>Seleciona el género</em>
                        </MenuItem>
                        {genres.map((genre, id) => (
                          <MenuItem
                            key={id}
                            value={genre.id}
                          >
                            {genre.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth sx={styles.formInput}>
                      <InputLabel id="demo-simple-select-label">Cantante</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.singer.id}
                        name="singer.id"
                        label="Cantante"
                        onChange={handleChange}
                        helperText={errors.singer?.id}
                      >
                        <MenuItem disabled value={undefined}>
                          <em>Seleciona el cantante</em>
                        </MenuItem>
                        {singers.map((singer, id) => (
                          <MenuItem
                            key={id}
                            value={parseInt(singer.id)}
                          >
                            {singer.stageName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      sx={styles.formInput}
                      label="Cantidad en stock"
                      error={Boolean(errors.stock)}
                      name="stock"
                      value={values.stock}
                      onChange={handleChange}
                      helperText={errors.stock}
                      type="number"
                    />

                    <Button
                      sx={styles.formButton}
                      variant="contained"
                      color="success"
                      type="submit"
                      disabled={!(isValid && dirty)}
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
                {`Editar el album ${albums[editIndex].name}.`}
              </Typography>{" "}
              <Formik
                initialValues={initialValuesUpdate}
                onSubmit={passToUpdate}
                validationSchema={validationSchemaUpdate}
              >
                {({ handleSubmit, handleChange, values, errors, isValid, dirty }) => (
                  <form onSubmit={handleSubmit}>
                    <Paper elevation={6} sx={styles.formContainer}>
                      <TextField
                        sx={styles.formInput}
                        label="Nombre"
                        error={Boolean(errors.name)}
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        helperText={errors.name}
                      />

                      <Field
                        name="image"
                        type="file"
                        component={SimpleFileUpload}
                        // accept={acceptFileType}
                        inputProps={{
                          accept:
                            "image/jpeg",
                        }}
                      />

                      <TextField
                        sx={styles.formInput}
                        label="Precio físico"
                        error={Boolean(errors.physicalPrice)}
                        name="physicalPrice"
                        value={values.physicalPrice}
                        onChange={handleChange}
                        helperText={errors.physicalPrice}
                        type="number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      />

                      <TextField
                        sx={styles.formInput}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="filled"
                        label="Fecha de lanzamiento"
                        error={Boolean(errors.releaseDate)}
                        name="releaseDate"
                        value={values.releaseDate}
                        onChange={handleChange}
                        helperText={errors.releaseDate}
                        type="date"
                      />

                      <FormControl fullWidth sx={styles.formInput}>
                        <InputLabel id="demo-simple-select-label">Género</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          name="genre.id"
                          id="demo-simple-select"
                          value={values.genre.id}
                          label="Género"
                          onChange={handleChange}
                          helperText={errors.genre?.id}
                        >
                          <MenuItem disabled value={undefined}>
                            <em>Seleciona el género</em>
                          </MenuItem>
                          {genres.map((genre, id) => (
                            <MenuItem
                              key={id}
                              value={genre.id}
                            >
                              {genre.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl fullWidth sx={styles.formInput}>
                        <InputLabel id="demo-simple-select-label">Cantante</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.singer.id}
                          name="singer.id"
                          label="Cantante"
                          onChange={handleChange}
                          helperText={errors.singer?.id}
                        >
                          <MenuItem disabled value={undefined}>
                            <em>Seleciona el cantante</em>
                          </MenuItem>
                          {singers.map((singer, id) => (
                            <MenuItem
                              key={id}
                              value={parseInt(singer.id)}
                            >
                              {singer.stageName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        sx={styles.formInput}
                        label="Cantidad en stock"
                        error={Boolean(errors.stock)}
                        name="stock"
                        value={values.stock}
                        onChange={handleChange}
                        helperText={errors.stock}
                        type="number"
                      />

                      <Button
                        sx={styles.formButton}
                        variant="contained"
                        color="success"
                        type="submit"
                        disabled={!(isValid && dirty)}
                      >
                        Crear
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

export default AdminAlbum;






// const AdminSong = () => {
//   return <div>AdminSong</div>;
// };

// export default AdminSong;