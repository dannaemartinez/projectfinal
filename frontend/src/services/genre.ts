import {
  addGenre,
  deleteGenre,
  setGenres,
  updateGenre,
} from "../features/musicSlice";
import { setLoading } from "../features/loaderSlice";
import { AppDispatch } from "../app/store";
import { fetchAuth } from "../helpers/auth";
import {
  CreateGenreDTO,
  GenrePosition,
  UpdateGenreDTO,
  DeleteGenreDTO
} from "../views/admin/genre/form";
import { Genre } from "../models/genre";

export const getGenres = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));

    const query = `query{
      allGenresSorting{
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

    const genres: Genre[] = (await response.json()).data.allGenresSorting;
    dispatch(setGenres(genres));
  } catch (err) {
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchDeleteGenre =
  (deleteGenreDTO: DeleteGenreDTO,storeIndex: number ) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const query= `mutation DeleteGenre($id:ID){
        deleteGenre(id:$id){
          ok
        }
      }`;
      const variables= deleteGenreDTO
      
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({query:query, variables: variables}),
      });

      if (response.status !== 200) return "";
      
      dispatch(deleteGenre(deleteGenreDTO));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchAddGenre =
  (createGenreDTO: CreateGenreDTO) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const query = `mutation UpsertGenre( $id: ID,  $name: String!) {
        upsertGenre(id: $id, name: $name) {
          genre {
            id
            name
          }
        }
      }`;
      const variables= createGenreDTO
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({query:query, variables: variables}),
      });

      if (response.status !== 200) return "";

      const genre: Genre = (await response.json()).data.upsertGenre.genre;
      dispatch(addGenre(genre));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchUpdateGenre =
  (updateGenreDTO: UpdateGenreDTO, genrePosition: GenrePosition) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const query = `mutation UpsertGenre( $id: ID,  $name: String!) {
        upsertGenre(id: $id, name: $name) {
          genre {
            id
            name
          }
        }
      }`;
      const variables= updateGenreDTO
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({query:query, variables: variables}),
        }
      );

      if (response.status !== 200) return "";

      const genre: Genre = (await response.json()).data.upsertGenre.genre;
      dispatch(updateGenre({ genre, index: genrePosition.index }));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };