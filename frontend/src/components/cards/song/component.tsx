import { Box, Typography, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { Styles } from "../../../theme/types";
import { SongCardProps } from "./types";

const SongCard: FC<SongCardProps> = ({ name, onClick }) => {
  // borré songs frente a stock
  const styles: Styles = {
    container: {
      width: "300px",
    },
    title: {
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    bottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "50px",
    },
    info: {
      fontSize: "0.8rem",
      fontWeight: "600",
    },
  };

  return (
    <Box sx={styles.container} onClick={onClick} >
      <Typography sx={styles.title}>{name}</Typography>
      <Box sx={styles.bottom}>
      { <Typography sx={styles.info}>{`Stock (${duration})`}</Typography> }
      </Box>
    </Box>
  );
};

export default SongCard;