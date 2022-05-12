import {
  addSong,
  deleteSong,
  setSongs,
  updateSong,
  setSelectedSong,
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
        $name: String!, 
        $previewFile: String!,
        $completeFile: String!, 
        $releaseDate:String!,
        $duration:Int!, 
        $digitalPrice:Decimal!, $albumId:Int!, $singerId:Int! ) {
        upsertSong(
          name: $name, 
          previewFile: $previewFile,
          completeFile:$completeFile,
          releaseDate: $releaseDate,
          duration: $duration,
          digitalPrice: $digitalPrice,
          albumId: $albumId, singerId: $singerId) {
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
      const query = `mutation UpsertSong(
        $id: ID,  
        $name: String!, 
        $previewFile: String!,
        $completeFile: String!, 
        $releaseDate:String!,
        $duration:Int!, 
        $digitalPrice:Decimal!, $albumId:Int!, $singerId:Int! ) {
        upsertSong(
          id: $id,
          name: $name, 
          previewFile: $previewFile,
          completeFile:$completeFile,
          releaseDate: $releaseDate,
          duration: $duration,
          digitalPrice: $digitalPrice,
          albumId: $albumId, singerId: $singerId) {
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
          }
        }`;
      const variables= updateSongDTO
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({query:query, variables: variables}),
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

  export const getSongById = (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
  
      const query = `query{
        songById(id: $id){
          id
          name
          
        }
      }`;
      const variables= {id: id};
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({query:query, variables: variables}),
      });
  
      if (response.status !== 200) return "";
  
      const songs: Song[] = (await response.json()).data.allSongsSorting;
      dispatch(setSelectedSong(songs));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };
  