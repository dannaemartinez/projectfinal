import { Box, Typography, ThemeProvider } from "@mui/material";
import AlbumCard from "../../components/cards/album/component";
import SingerCard from "../../components/cards/singer/component";
import { Styles } from "../../theme/types";
import { getSingers } from "../../services/singer";
import { getAlbums } from "../../services/album";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { albumsSelector, singersSelector } from "../../features/musicSlice";
import {darkTheme} from "../../theme/theme"


const Explore = () => {
  const dispatch = useDispatch();

  const singers = useAppSelector(singersSelector);
  const albums = useAppSelector(albumsSelector);

  useEffect(() => {
    dispatch(getSingers());
    dispatch(getAlbums());
  }, [dispatch]);

  const styles: Styles = {
    title: {
      fontFamily: "'Koulen'",
      width: "1000px",
      padding: "20px 0",
    },
    subtitle: {
      fontWeight: "600",
      padding: "10px 0",
    },
    albumsContainer: {
      width: "100%",
    },
    albumsList: {
      width: "100%",
      display: "flex",
      overflowX: "scroll",
      gap: "60px",
      paddingBottom: "20px",
    },
    singerContainer: {
      width: "100%",
    },
    singerList: {
      width: "100%",
      display: "flex",
      overflowX: "auto",
      gap: "60px",
      paddingBottom: "20px",
    },
  };

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <Typography variant="h2" sx={styles.title}>
        Escucha la mejor musica en Ninja.
      </Typography>
      <Box sx={styles.albumsContainer}>
        <Typography variant="h6" sx={styles.subtitle}>
          Sus álbumes.
        </Typography>
        <Box sx={styles.albumsList}>
          {albums.map((album) => (
            <AlbumCard
              {...album}
              key={`album-${album.id}`}
              // songs={album.songs.length}
            />
          ))}
        </Box>
        <Box sx={styles.singersContainer}>
          <Typography variant="h6" sx={styles.subtitle}>
            Los artistas más escuchados.
          </Typography>
          <Box sx={styles.singerList}>
            {singers.map((singer) => (
              <SingerCard {...singer} key={`singer-${singer.id}`} />
            ))}
          </Box>
        </Box>
      </Box>
      </ThemeProvider>
    </>
  );
};

export default Explore;