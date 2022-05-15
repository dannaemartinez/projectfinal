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
  InputLabel,
  FormHelperText
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



  const passToCreate = (values: CreateSongDTO) => {
    getBase64(values.completeFile, (result) => {
      values.completeFile = result;
      getBase64(values.previewFile, (result) => {
        values.previewFile = result;
        createSong(values);
      });
    });
  }


  const passToUpdate = (values: UpdateSongDTO) => {
    if (editIndex !== undefined)
      getBase64(values.completeFile, (result) => {
        values.completeFile = result;
        getBase64(values.previewFile, (result) => {
          values.previewFile = result;
          console.log(values);
          updateSong(values, {
            id: songs[editIndex].id,
            index: editIndex,
          });
        });
      });
  };

  return (
    <>
      <Typography variant="h2" sx={styles.title}>
        Administrador de Canciones.
      </Typography>{" "}
      <Box sx={styles.songContainer}>
        <TableInfo
          sx={styles.tableInfo}
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
                  onClick={() => {
                    console.log(item);
                    setInitialEditValues({
                      id: parseInt(item.id),
                      name: item.name,
                      previewFile: undefined,
                      completeFile: undefined,
                      releaseDate: item.releaseDate,
                      duration: item.duration,
                      digitalPrice: item.digitalPrice,
                      albumId: parseInt(item.album.id),
                      singerId: parseInt(item.singer.id)
                    });
                    setEditIndex(index);
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
              Crear una nueva canción.
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

                    <FormControl fullWidth sx={styles.formInput}>
                      <Field
                        label="Complete"
                        name="completeFile"
                        type="file"
                        component={SimpleFileUpload}
                        accept={["audio/mpeg", "audio/m4a"].join(",")}
                        error={Boolean(errors.completeFile)}
                      />
                      {errors.completeFile && <FormHelperText>{errors.completeFile}</FormHelperText>}
                    </FormControl>

                    <FormControl fullWidth sx={styles.formInput}>
                      <Field
                        label="Preview"
                        name="previewFile"
                        type="file"
                        component={SimpleFileUpload}
                        accept={["audio/mpeg", "audio/m4a"].join(",")}
                        error={Boolean(errors.previewFile)}
                      />
                      {errors.previewFile && <FormHelperText>{errors.previewFile}</FormHelperText>}
                    </FormControl>

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
                      onChange={(e) => {
                        console.log(errors)
                        handleChange(e)
                      }}
                      helperText={(typeof errors.releaseDate === 'string') && errors.releaseDate}
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
                      type="number"
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
                        value={values.albumId}
                        name="albumId"
                        label="Album"
                        error={Boolean(errors.albumId)}
                        onChange={handleChange}
                      >
                        <MenuItem disabled value={undefined}>
                          <em>Seleciona el album</em>
                        </MenuItem>
                        {albums.map((album, id) => (
                          <MenuItem
                            key={id}
                            value={(album.id)}
                          >
                            {album.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.albumId && <FormHelperText>{errors.albumId}</FormHelperText>}
                    </FormControl>

                    <FormControl fullWidth sx={styles.formInput}>
                      <InputLabel id="demo-simple-select-label">Cantante</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.singerId}
                        name="singerId"
                        label="Cantante"
                        error={Boolean(errors.singerId)}
                        onChange={handleChange}
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
                      {errors.singerId && <FormHelperText>{errors.singerId}</FormHelperText>}
                    </FormControl>
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
                {`Editar la canción ${songs[editIndex].name}.`}
              </Typography>{" "}
              <Formik
                enableReinitialize={true}
                initialValues={initialEditValues || initialValuesUpdate}
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

                      <FormControl fullWidth sx={styles.formInput}>
                        <Field
                          label="Complete"
                          name="completeFile"
                          type="file"
                          component={SimpleFileUpload}
                          accept={["audio/mpeg", "audio/m4a"].join(",")}
                          error={Boolean(errors.completeFile)}
                        />
                        {errors.completeFile && <FormHelperText>{errors.completeFile}</FormHelperText>}
                      </FormControl>

                      <FormControl fullWidth sx={styles.formInput}>
                        <Field
                          label="Preview"
                          name="previewFile"
                          type="file"
                          component={SimpleFileUpload}
                          accept={["audio/mpeg", "audio/m4a"].join(",")}
                          error={Boolean(errors.previewFile)}
                        />
                        {errors.previewFile && <FormHelperText>{errors.previewFile}</FormHelperText>}
                      </FormControl>

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
                        onChange={(e) => {
                          console.log(errors)
                          handleChange(e)
                        }}
                        helperText={(typeof errors.releaseDate === 'string') && errors.releaseDate}
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
                        type="number"
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
                          value={values.albumId}
                          name="albumId"
                          label="Album"
                          onChange={handleChange}
                        >
                          <MenuItem disabled value={undefined}>
                            <em>Seleciona el album</em>
                          </MenuItem>
                          {albums.map((album, id) => (
                            <MenuItem
                              key={id}
                              value={(album.id)}
                            >
                              {album.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.albumId && <FormHelperText>{errors.albumId}</FormHelperText>}
                      </FormControl>

                      <FormControl fullWidth sx={styles.formInput}>
                        <InputLabel id="demo-simple-select-label">Cantante</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.singerId}
                          name="singerId"
                          label="Cantante"
                          onChange={handleChange}
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
                        {errors.singerId && <FormHelperText>{errors.singerId}</FormHelperText>}
                      </FormControl>
                      <Button
                        sx={styles.formButton}
                        variant="contained"
                        color="warning"
                        type="submit"
                        disabled={!(isValid && dirty)}
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