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
  DeleteAlbumDTO,
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
          songs{
            id
            name
          }
          physicalPrice
      }
    }`;
    const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
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
  (deleteAlbumDTO: DeleteAlbumDTO, storeIndex: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const query = `mutation DeleteAlbum($id:ID){
        deleteAlbum(id:$id){
          ok
        }
      }`;
      const variables = deleteAlbumDTO
      
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query, variables: variables }),
      });

      if (response.status !== 200) return "";

      dispatch(deleteAlbum(deleteAlbumDTO));
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
      const variables = createAlbumDTO
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query, variables: variables }),
      });

      if (response.status !== 200) return "";

      const album: Album = (await response.json()).data.upsertAlbum.album;
      dispatch(addAlbum(album));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchUpdateAlbum =
  (updateAlbumDTO: UpdateAlbumDTO, albumPosition: AlbumPosition) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(setLoading(true));
        const query = `mutation UpsertAlbum($id: ID, $image: String,  $name: String!,  $physicalPrice: Decimal!,  $releaseDate: String, 
        $singer: SingersInput!,  $genre: GenresInput!,  $stock: Int!) {
        upsertAlbum(id: $id,  image: $image,  name: $name,  physicalPrice: $physicalPrice,  releaseDate: $releaseDate,  singer: $singer, 
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
            }
          }
        }
      }`;
        const variables = updateAlbumDTO
        const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: query, variables: variables }),
        }
        );

        if (response.status !== 200) return "";

        const album: Album = (await response.json()).data.upsertAlbum.album;
        dispatch(updateAlbum({ album, index: albumPosition.index }));
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