import * as Yup from "yup";
import { store } from "../../app/store";
import { getAuthToken } from "../../services/user";
import { sha512 } from "js-sha512";

export interface CreateUserDTO {
  username?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  email?: string;
  
}

export const validationSchema: Yup.SchemaOf<CreateUserDTO> = Yup.object({
  username: Yup.string()
    .required("El username del usuario es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
  first_name: Yup.string().required("El primer nombre es requerido"),
  last_name: Yup.string().required("EL apellido es requerido"),
  email: Yup.string().required("El email es requerido"),
});

export const initialValues: CreateUserDTO = {
  username: undefined,
  password: undefined,
  first_name: undefined,
  last_name: undefined,
  email: undefined,
};

export const createUser = (values: CreateUserDTO) => {
  const user: CreateUserDTO = {
    username: values.username,
    password: sha512(values.password),
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,

  };
  store.dispatch(createUser(user));
};