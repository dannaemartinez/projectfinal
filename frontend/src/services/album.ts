import {
  addAlbum,
  deleteAlbum,
  setAlbums,
  updateAlbum,
} from "../features/musicSlice";
import { setLoading } from "../features/loaderSlice";
import { AppDispatch } from "../app/store";
import { Album } from "../models/album";
import { fetchAuth } from "../helpers/auth";
import {
  CreateAlbumDTO,
  AlbumPosition,
  UpdateAlbumDTO,
} from "../views/admin/album/form";

export const getAlbums = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));

    const query = `query{
      allAlbumsSorting{
          id
          name
          stock
          image
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

    const albums: Album[] = (await response.json()).data.allAlbumsSorting;
    dispatch(setAlbums(albums));
  } catch (err) {
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchDeleteAlbum =
  (id: string, index: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetchAuth(`http://localhost:8000/album/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) return "";

      dispatch(deleteAlbum(index));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchAddAlbum =
  (createAlbumDTO: CreateAlbumDTO) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      
      const query = `mutation UpsertAlbum( $image: String,  $name: String!,  $physicalPrice: Decimal!,  $releaseDate: String, 
        $singer: SingersInput!,  $genre: GenresInput!,  $stock: Int!) {
        upsertAlbum( image: $image,  name: $name,  physicalPrice: $physicalPrice,  releaseDate: $releaseDate,  singer: $singer, 
          stock: $stock,  genre: $genre) {
          album {
            id
            name
            image
            physicalPrice
            releaseDate
            stock
            genre {
              id
            }
            singer {
              id
              name
            }
          }
        }
      }`;
      const variables= createAlbumDTO
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({query:query, variables: variables}),
      });

      if (response.status !== 200) return "";

      const album: Album = await response.json();
      dispatch(addAlbum(album));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchUpdateAlbum =
  (updateAlbumDTO: UpdateAlbumDTO, AlbumPosition: AlbumPosition) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetchAuth(
        `http://localhost:8000/album/${AlbumPosition.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateAlbumDTO),
        }
      );

      if (response.status !== 200) return "";

      const album: Album = await response.json();
      dispatch(updateAlbum({ album, index: AlbumPosition.index }));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };


// import { setAlbums } from "../features/musicSlice";
// import { setLoading } from "../features/loaderSlice";
// import { AppDispatch } from "../app/store";
// import { Singer } from "../models/singer";

// export const getAlbums = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(setLoading(true));
//     const response = await fetch("http://localhost:8000/album");

//     if (response.status !== 200) return "";

//     const albums: Singer[] = await response.json();
//     dispatch(setAlbums(albums));
//   } catch (err) {
//     throw err;
//   } finally {
//     dispatch(setLoading(false));
//   }
// };