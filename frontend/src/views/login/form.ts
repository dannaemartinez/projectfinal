import * as Yup from "yup";
import { store } from "../../app/store";
import { getAuthToken } from "../../services/user";
import { sha512 } from "js-sha512";

export interface LoginDTO {
  password: string;
  username: string;
}

export const validationSchema: Yup.SchemaOf<LoginDTO> = Yup.object({
  username: Yup.string()
    .required("El username del usuario es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

export const initialValues: LoginDTO = {
  username: "",
  password: "",
};

export const loginUser = (values: LoginDTO) => {
  const user: LoginDTO = {
    username: values.username,
    password: sha512(values.password),
  };
  store.dispatch(getAuthToken(user));
};