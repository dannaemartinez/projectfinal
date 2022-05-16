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
  Snackbar,
  SnackbarOrigin,
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
import { styles } from "./styles"

export interface State  {
  open: boolean;
  snackMessage: string;
}

const Sale = () => {

  const dispatch = useDispatch();

  const songs = useAppSelector(songsSelector);
  const albums = useAppSelector(albumsSelector);

  useEffect(() => {
    dispatch(getSongs());
    dispatch(getAlbums());
  }, [dispatch]);

  const [state, setState] = useState<State>({
    open: false,
    snackMessage: ""
  });

  const { open, snackMessage } = state;

  const handleClick = (message: string) => {
    setState({ open: true, snackMessage: message});
  };

  const handleClose = () => {
    setState({ open: false, snackMessage: "" });
  };


  return (
    <>
      <Typography variant="h2" sx={styles.title}>
        Compras
      </Typography>{" "}
      <Snackbar
        anchorOrigin={{vertical: 'top',
        horizontal: 'right'}}
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        key={"topright"}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
      <Box sx={styles.saleItemContainer}>
        <Typography variant="h4" sx={styles.title}>
          Canciones
        </Typography>{" "}
        <TableInfo
          sx={styles.tableInfo}
          rowsPerPageOptions={[5, 10, 15]}
          data={songs}
          columnsNames={["Id", "Nombre", "Precio", "Acciones"]}
          title="Canciones"
          row={(item, index) => (
            <TableRow>
              <TableCell sx={styles.saleItemId}>{item.id}</TableCell>
              <TableCell sx={styles.saleItemField}>{item.name}</TableCell>
              <TableCell sx={styles.saleItemField}>{item.digitalPrice}</TableCell>
              <TableCell sx={styles.saleItemActions}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={()=>{handleClick("Compra de cancion exitosa")}}
                >
                  Comprar
                </Button>
              </TableCell>
            </TableRow>
          )}
        ></TableInfo>
      </Box>

      <Box sx={styles.saleItemContainer}>
        <Typography variant="h4" sx={styles.title}>
          Albums
        </Typography>{" "}
        <TableInfo
          rowsPerPageOptions={[5, 10, 15]}
          data={albums}
          columnsNames={["Id", "Nombre", "Precio", "Acciones"]}
          title="Albums"
          row={(item, index) => (
            <TableRow>
              <TableCell sx={styles.saleItemId}>{item.id}</TableCell>
              <TableCell sx={styles.saleItemField}>{item.name}</TableCell>
              <TableCell sx={styles.saleItemField}>{item.physicalPrice}</TableCell>
              <TableCell sx={styles.saleItemActions}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={()=>{handleClick("Compra de album exitosa")}}
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