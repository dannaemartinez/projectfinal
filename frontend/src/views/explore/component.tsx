import { Box, Typography } from "@mui/material";
import AlbumCard from "../../components/cards/album/component";
import SingerCard from "../../components/cards/singer/component";
import { Styles } from "../../theme/types";
import { getSingers } from "../../services/singer";
import { getAlbums } from "../../services/album";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { albumsSelector, singersSelector, songsSelector } from "../../features/musicSlice";
import "./styles.css"

const Explore = () => {
  const dispatch = useDispatch();

  const singers = useAppSelector(singersSelector);
  const albums = useAppSelector(albumsSelector);

  useEffect(() => {
    dispatch(getSingers());
    dispatch(getAlbums());
  }, [dispatch]);

return (
    <>
      <Typography variant="h2" className="title">
        La Música de las Mejores
      </Typography>
      <Box className="albumsContainer">
        <Typography variant="h6" className="subtitle">
          Sus Creaciones
        </Typography>
        <Box className = "albumsList">
          {albums.map((album) => (
            <AlbumCard
              {...album}
              key={`album-${album._id}`}
              songs={album.songs.length}
            />
          ))}
        </Box>
        <Box className = "singersContainer">
          <Typography variant="h6" className="subtitle">
            Ellas
          </Typography>
          <Box className ="singerList">
            {singers.map((singer) => (
              <SingerCard {...singer} key={`singer-${singer._id}`} />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Explore;
