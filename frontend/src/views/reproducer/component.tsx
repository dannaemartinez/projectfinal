import { useEffect } from "react";
import { Box, Typography, ThemeProvider, Divider } from "@mui/material";
import AlbumCard from "../../components/cards/album/component";
import SongCard from "../../components/cards/song/component";
import { getAlbums } from "../../services/album";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Styles } from "../../theme/types";
import { useAppSelector } from "../../app/hooks";
import { albumsSelector, singersSelector, songsSelector } from "../../features/musicSlice";
import { getSingers } from "../../services/singer";
import { darkTheme } from "../../theme/theme";
import { getSongs } from "../../services/song";

const Reproducer = () => {
  const dispatch = useDispatch();

  const singers = useAppSelector(singersSelector);
  const albums = useAppSelector(albumsSelector);
  const songs = useAppSelector(songsSelector);

  const setAsSelectedSong= (id: number) =>{
    // store.dispatch(fetchAddAlbum(values));
  }

  useEffect(() => {
    dispatch(getSingers());
    dispatch(getAlbums());
    dispatch(getSongs());
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
    albumGenerals: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    songsContainer: {
      width: "100%",
    },
    albumItem: {
      display: "grid",
      height: "100%",
      gridTemplateColumns: "auto auto",
    },
    // albumsList: {
    //   width: "100%",
    //   display: "flex",
    //   overflowX: "scroll",
    //   gap: "60px",
    //   paddingBottom: "20px",
    // },
    singerList: {
      width: "100%",
      display: "flex",
      overflowX: "auto",
      gap: "60px",
      paddingBottom: "20px",
    },
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Typography variant="h2" sx={styles.title}>
          Ninja-Reproducer
        </Typography>
        <Box sx={styles.albumsContainer}>
          <Typography variant="h6" sx={styles.subtitle}>
            Sus álbumes.
          </Typography>
          <Box sx={styles.albumsList}>
            {albums.map((album) => (
              <>
                <Divider />
                <Box sx={styles.albumItem}>
                  <Box sx={styles.albumGenerals}>
                    <AlbumCard
                      {...album}
                      key={`album-${album.id}`}
                    />
                  </Box>
                  <Box sx={styles.songsContainer}>
                    <Typography variant="h6" sx={styles.subtitle}>
                      Canciones
                    </Typography>
                    <Box sx={styles.songList}>
                      {album.songs.map((song) => (
                        <SongCard {...song}
                          key={`song-${song.id}`}
                          onClick={()=>setAsSelectedSong(parseInt(song.id))}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </>
            ))}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
};

export default Reproducer;