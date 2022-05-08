import { AppDispatch } from "../app/store";
import { setAuth } from "../features/authSlice";
import { setLoading } from "../features/loaderSlice";
import { LoginDTO } from "../views/login/form";

export const getAuthToken = (user: LoginDTO) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const query= `mutation TokenAuth($username: String!, $password: String!) {
      tokenAuth(username: $username, password: $password) {
        token
        payload
        refreshExpiresIn
      }
    }`;

    console.log(query)
    const response = await fetch(`${process.env.BASE_API_URI}/grapqhl`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/graphql',
      },
      body: JSON.stringify({query, user}),
    });

    console.log(response);
    if (response.status !== 200) return "";

    const userAuth = await response.json();
    dispatch(setAuth(userAuth));
  } catch (err) {
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};

export const verifyToken = (token: VerifyTtokenDTO) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const query= `mutation VerifyToken($token:String!){
      verifyToken(token:$token){
        payload
      }
    }`;
    const response = await fetch(`${process.env.BASE_API_URI}/grapqhl`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/graphql',
      },
      body: JSON.stringify({query, token}),
    });

    if (response.status !== 200) return "";

    const tokenVerified = await response.json();
    // dispatch(setAuth(userAuth));
  } catch (err) {
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};

export interface VerifyTtokenDTO {
  token: string;
}