// import { useEffect } from "react";
import { Box, Typography, ThemeProvider, Divider } from "@mui/material";
import AlbumCard from "../../components/cards/album/component";
import SongCard from "../../components/cards/song/component";
import { getAlbums } from "../../services/album";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { Styles } from "../../theme/types";
// import { useAppSelector } from "../../app/hooks";
// import { albumsSelector, singersSelector, songsSelector } from "../../features/musicSlice";
// import { getSingers } from "../../services/singer";
// import { darkTheme } from "../../theme/theme";
// import { getSongs } from "../../services/song";
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { albumsSelector, songsSelector, selectedSongSelector } from '../../features/musicSlice';
import { useEffect } from 'react';
import { getSongById, getSongs } from '../../services/song';
// import AudioPlayer from 'material-ui-audio-player';
import { darkTheme } from '../../theme/theme';

const Reproducer = () => {

  const dispatch = useDispatch();

  const songs = useAppSelector(songsSelector);
  const albums = useAppSelector(albumsSelector);
  const selectedSong = useAppSelector(selectedSongSelector);

  useEffect(() => {
    dispatch(getSongs());
    dispatch(getAlbums());
  }, [dispatch]);

  //   const dispatch = useDispatch();

  //   const singers = useAppSelector(singersSelector);
  //   const songs = useAppSelector(songsSelector);

  const setAsSelectedSong = (id: number) => {
    dispatch(getSongById(id));
  }

  //   useEffect(() => {
  //     dispatch(getSingers());
  //     dispatch(getAlbums());
  //     dispatch(getSongs());
  //   }, [dispatch]);

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
      alignItems: "center",
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
      <Autocomplete
        id="song-select"
        sx={{ width: 300 }}
        options={songs}
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} onClick={() => { setAsSelectedSong(parseInt(option.id)) }} >
            {/* <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            /> */}
            {option.name} - ({option.singer.stageName})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Busca una canción"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />

      {selectedSong !== undefined && (
        <>
          <Box sx={styles.albumItem}>
            <Box sx={styles.albumGenerals}>
              <AlbumCard
                {...albums[parseInt(selectedSong.album?.id)]}
                key={`album-${selectedSong.album?.id}`}
              />
            </Box>
            <Box sx={styles.songsContainer}>
              <Box>

                <Typography variant="h6" sx={styles.subtitle}>
                  Reproduciendo
                </Typography>
                <Box sx={styles.songList}>
                  <SongCard {...selectedSong}
                    key={`song-${selectedSong.id}`}
                    onClick={() => setAsSelectedSong(parseInt(selectedSong.id))}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <audio
            controls
            autoPlay
            src={selectedSong.completeFile}>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </>
      )}
      {
        /*
          //       <ThemeProvider theme={darkTheme}>
          //         <Typography variant="h2" sx={styles.title}>
          //           Ninja-Reproducer
          //         </Typography>
          //         <Box sx={styles.albumsContainer}>
          //           <Typography variant="h6" sx={styles.subtitle}>
          //             Sus álbumes.
          //           </Typography>
          //           <Box sx={styles.albumsList}>
          //             {albums.map((album) => (
          //               <>
          //                 <Divider />
          //                 <Box sx={styles.albumItem}>
          //                   <Box sx={styles.albumGenerals}>
          //                     <AlbumCard
          //                       {...album}
          //                       key={`album-${album.id}`}
          //                     />
          //                   </Box>
          //                   <Box sx={styles.songsContainer}>
          //                     <Typography variant="h6" sx={styles.subtitle}>
          //                       Canciones
          //                     </Typography>
          //                     <Box sx={styles.songList}>
          //                       {album.songs.map((song) => (
          //                         <SongCard {...song}
          //                           key={`song-${song.id}`}
          //                           onClick={()=>setAsSelectedSong(parseInt(song.id))}
          //                         />
          //                       ))}
          //                     </Box>
          //                   </Box>
          //                   this.player = createRef()
          //                   <AudioPlayer ref={this.player} />
          //                 </Box>
          //               </>
          //             ))}
          //           </Box>
          //         </Box>
          //       </ThemeProvider> 
        */
      }
    </>
  )
};

export default Reproducer;
