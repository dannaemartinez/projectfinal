import {
  addSinger,
  deleteSinger,
  setSingers,
  updateSinger,
} from "../features/musicSlice";
import { setLoading } from "../features/loaderSlice";
import { AppDispatch } from "../app/store";
import { Singer } from "../models/singer";
import { fetchAuth } from "../helpers/auth";
import {
  CreateSingerDTO,
  SingerPosition,
  UpdateSingerDTO,
} from "../views/admin/singer/form";

export const getSingers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));

    const query = `query{
      allSingersSorting{
          id
          stageName
          name
          lastName
          nationality
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

    const singers: Singer[] = (await response.json()).data.allSingersSorting;
    dispatch(setSingers(singers));
  } catch (err) {
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchDeleteSinger =
  (id: string, index: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetchAuth(`http://localhost:8000/singer/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) return "";

      dispatch(deleteSinger(index));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchAddSinger =
  (createSingerDTO: CreateSingerDTO) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const query = `mutation UpsertSinger( 
        $id: ID,  
        $name: String!, 
        $stageName: String!, 
        $lastName:String!,
        $nationality:String!, 
        $image: String!) {
        upsertSinger(
          id: $id, 
          name: $name, 
          stageName: $stageName,
          lastName:$lastName,
          nationality: $nationality,
          image: $image
           ) {
          singer {
            id
            stageName
            name
            lastName
            nationality
            image
          }
        }
      }`;
      const variables= createSingerDTO
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({query:query, variables: variables}),
      });

      if (response.status !== 200) return "";

      const singer: Singer = await response.json();
      dispatch(addSinger(singer));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchUpdateSinger =
  (updateSingerDTO: UpdateSingerDTO, singerPosition: SingerPosition) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const query = `mutation UpsertSinger( 
        $id: ID,  
        $name: String!, 
        $stageName: String!, 
        $lastName:String!,
        $nationality:String!, 
        $image: String!) {
        upsertSinger(
          id: $id, 
          name: $name, 
          stageName: $stageName,
          lastName:$lastName,
          nationality: $nationality,
          image: $image
           ) {
          singer {
            id
            stageName
            name
            lastName
            nationality
            image
          }
        }
      }`;
      const variables= updateSingerDTO
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URI}/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({query:query, variables: variables}),
        }
      );

      if (response.status !== 200) return "";

      const singer: Singer = await response.json();
      dispatch(updateSinger({ singer, index: singerPosition.index }));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };