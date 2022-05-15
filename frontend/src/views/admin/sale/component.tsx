import {
  Box,
  Button,
  Input,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SimpleFileUpload } from 'formik-material-ui'
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import TableInfo from "../../../components/table/component";
import { songsSelector } from "../../../features/musicSlice";
import { albumsSelector } from "../../../features/musicSlice";
import { getBase64 } from "../../../helpers/files";
import { Field, Formik } from "formik";
import { fetchUpdateSong, getSongs } from "../../../services/song";
import { getAlbums } from "../../../services/album";
import { styles } from "../album/styles";

const Sale = () => {

  const dispatch = useDispatch();

  const songs = useAppSelector(songsSelector);
  const albums = useAppSelector(albumsSelector);

  useEffect(() => {
    dispatch(getSongs());
    dispatch(getAlbums());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h2" sx={styles.title}>
        Compras
      </Typography>{" "}
      <Box sx={styles.songContainer}>
        <TableInfo
          rowsPerPageOptions={[5, 10, 15]}
          data={songs}
          columnsNames={["Id", "Nombre", "Precio", "Acciones"]}
          title="Canciones"
          row={(item, index) => (
            <TableRow>
              <TableCell sx={styles.songId}>{item.id}</TableCell>
              <TableCell sx={styles.songField}>{item.name}</TableCell>
              <TableCell sx={styles.songField}>{item.digitalPrice}</TableCell>
              <TableCell sx={styles.songActions}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => <Alert severity="success">Compra Exitosa!</Alert>}
                >
                  Comprar
                </Button>
              </TableCell>
            </TableRow>
          )}
        ></TableInfo>
      </Box>
      <Box sx={styles.albumContainer}>
        <TableInfo
          rowsPerPageOptions={[5, 10, 15]}
          data={albums}
          columnsNames={["Id", "Nombre", "Precio", "Acciones"]}
          title="Albums"
          row={(item, index) => (
            <TableRow>
              <TableCell sx={styles.albumId}>{item.id}</TableCell>
              <TableCell sx={styles.albumField}>{item.name}</TableCell>
              <TableCell sx={styles.albumField}>{item.physicalPrice}</TableCell>
              <TableCell sx={styles.albumActions}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => <Alert severity="success">Compra Exitosa!</Alert>}
                >
                  Comprar
                </Button>
              </TableCell>
            </TableRow>
          )
          }
        />
      </Box>
    </>
  );
};
export default Sale;