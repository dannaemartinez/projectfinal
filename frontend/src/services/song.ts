import {
  addSong,
  deleteSong,
  setSongs,
  updateSong,
} from "../features/musicSlice";
import { setLoading } from "../features/loaderSlice";
import { AppDispatch } from "../app/store";
import { fetchAuth } from "../helpers/auth";
import {
  CreateSongDTO,
  SongPosition,
  UpdateSongDTO,
} from "../views/admin/song/form";
import { Song } from "../models/song";

export const getSongs = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));

    const query = `query{
      allSongsSorting{
        id
        name
        
      }
    }`;
    const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({query:query}),
    });

    if (response.status !== 200) return "";

    const songs: Song[] = (await response.json()).data.allSongsSorting;
    dispatch(setSongs(songs));
  } catch (err) {
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchDeleteSong =
  (id: string, index: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetchAuth(`http://localhost:8000/song/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) return "";

      dispatch(deleteSong(index));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchAddSong =
  (createSongDTO: CreateSongDTO) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const query = `mutation UpsertSong( 
        $id: ID,  
        $name: String!, 
        $previewFile: String!,
        $completeFile: String!, 
        $releaseDate:String!,
        $duration:Int!, 
        $digitalPrice:Decimal!, $album:Int!, $singer:Int! ) {
        upsertSong(
          id: $id, 
          name: $name, 
          previewFile: $previewFile,
          completeFile:$completeFile,
          releaseDate: $releaseDate,
          duration: $duration,
          digitalPrice: $digitalPrice,
          album: $album, singer: $singer) 
          song {
            id
            name
            previewFile
            completeFile
            releaseDate
            duration
            digitalPrice
            singer {
              id
              name},
            album {
              id
              name}
            }
          }`;
      const variables= createSongDTO
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({query:query, variables: variables}),
      });

      if (response.status !== 200) return "";

      const song: Song = await response.json();
      dispatch(addSong(song));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchUpdateSong =
  (updateSongDTO: UpdateSongDTO, songPosition: SongPosition) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetchAuth(
        `http://localhost:8000/song/${songPosition.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateSongDTO),
        }
      );

      if (response.status !== 200) return "";

      const song: Song = await response.json();
      dispatch(updateSong({ song, index: songPosition.index }));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };