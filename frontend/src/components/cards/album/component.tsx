import { Box, Typography, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { Styles } from "../../../theme/types";
import { AlbumCardProps } from "./types";
import { getImageSrc } from "../../../helpers/files";

const AlbumCard: FC<AlbumCardProps> = ({ image, stock, name }) => {
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

  const imageStyle = {
    width: "300px",
    height: "300px",
    borderRadius: "10px",
    boxShadow:
      "0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)",
  };

  return (
    <Box sx={styles.container}>
      <img style={imageStyle} src={getImageSrc(image)} alt={`album-${name}`} />
      <Typography sx={styles.title}>{name}</Typography>
      <Box sx={styles.bottom}>
        {/* <Typography sx={styles.info}>{`${songs} Songs`}</Typography> */}
        { <Typography sx={styles.info}>{`Stock (${stock})`}</Typography> }
      </Box>
    </Box>
  );
};

export default AlbumCard;