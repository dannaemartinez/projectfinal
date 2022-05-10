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
import { songsSelector, albumsSelector, singersSelector } from "../../../features/musicSlice";
import { fetchDeleteSong, getSongs } from "../../../services/song";
import { getSingers } from "../../../services/singer";
import { getAlbums } from "../../../services/album";
import { getBase64 } from "../../../helpers/files";
import { Field, Formik } from "formik";
import { styles } from "./styles";
import {
  createSong,
  initialValuesUpdate,
  initialValuesCreate,
  validationSchemaCreate,
  validationSchemaUpdate,
  updateSong,
  CreateSongDTO,
  UpdateSongDTO,
} from "./form";

const AdminSong = () => {
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);
  const [initialEditValues, setInitialEditValues] = useState<UpdateSongDTO | undefined>(undefined);
  const dispatch = useDispatch();

  const songs = useAppSelector(songsSelector);
  const albums = useAppSelector(albumsSelector);
  const singers = useAppSelector(singersSelector);


  useEffect(() => {
    dispatch(getSongs());
    dispatch(getAlbums());
    dispatch(getSingers());
  }, [dispatch]);


  const passToUpdate = (values: UpdateSongDTO) => {
    if (editIndex !== undefined)
      updateSong(values, {
        id: songs[editIndex].id,
        index: editIndex,
      });
  };
  return (
    <>
      <Typography variant="h2" sx={styles.title}>
        Administrador de Canciones.
      </Typography>{" "}
      <Box sx={styles.songContainer}>
        <TableInfo
          rowsPerPageOptions={[5, 10, 15]}
          data={songs}
          columnsNames={["Id", "Nombre", "Acciones"]}
          title="Canciones"
          row={(item, index) => (
            <TableRow>
              <TableCell sx={styles.songId}>{item.id}</TableCell>
              <TableCell sx={styles.songField}>{item.name}</TableCell>
              <TableCell sx={styles.songActions}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(fetchDeleteSong(item.id, index))}
                >
                  Eliminar
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {setInitialEditValues({ id: parseInt(item.id)})
                   setEditIndex(index)}}
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
              Crear una nueva canción.
            </Typography>{" "}
            <Formik
              initialValues={initialValuesCreate}
              onSubmit={createSong}
              validationSchema={validationSchemaCreate}
            >
              {({ handleSubmit, handleChange, values, errors, isValid, dirty  }) => (
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
                    <TextField
                      sx={styles.formInput}
                      label="Preview"
                      error={Boolean(errors.previewFile)}
                      name="previewFile"
                      value={values.previewFile}
                      onChange={handleChange}
                      helperText={errors.previewFile}
                    />
                    <TextField
                      sx={styles.formInput}
                      label="Complete"
                      error={Boolean(errors.completeFile)}
                      name="completeFile"
                      value={values.completeFile}
                      onChange={handleChange}
                      helperText={errors.completeFile}
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
                    <TextField
                      sx={styles.formInput}
                      label="Duración"
                      error={Boolean(errors.duration)}
                      name="duration"
                      value={values.duration}
                      onChange={handleChange}
                      helperText={errors.duration}
                    />
                    <TextField
                      sx={styles.formInput}
                      label="Precio digital"
                      error={Boolean(errors.digitalPrice)}
                      name="digitalPrice"
                      value={values.digitalPrice}
                      onChange={handleChange}
                      helperText={errors.digitalPrice}
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                    <FormControl fullWidth sx={styles.formInput}>
                      <InputLabel id="demo-simple-select-label">Album</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.album.id}
                        name="album.id"
                        label="Cantante"
                        onChange={handleChange}
                        helperText={errors.album?.id}
                      >
                        <MenuItem disabled value={undefined}>
                          <em>Seleciona el album</em>
                        </MenuItem>
                        {albums.map((album, id) => (
                          <MenuItem
                            key={id}
                            value={parseInt(album.id)}
                          >
                            {album.name}
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
                {`Editar las canciones ${songs[editIndex].name}.`}
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

export default AdminSong;






// const AdminSong = () => {
//   return <div>AdminSong</div>;
// };

// export default AdminSong;