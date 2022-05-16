import * as Yup from "yup";
import { store } from "../../app/store";
import { fetchRegisterUser, getAuthToken } from "../../services/user";
// import { sha512 } from "js-sha512";

export interface CreateUserDTO {
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  mode: number
  
}

export const validationSchema: Yup.SchemaOf<CreateUserDTO> = Yup.object({
  username: Yup.string()
    .required("El username del usuario es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
  firstName: Yup.string().required("El primer nombre es requerido"),
  lastName: Yup.string().required("EL apellido es requerido"),
  email: Yup.string().required("El email es requerido"),
  mode: Yup.number().required("El modo es requerido")
});

export const initialValues: CreateUserDTO = {
  username: undefined,
  password: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  mode: 1
};

export const createUser = (values: CreateUserDTO) => {
  const user: CreateUserDTO = {
    username: values.username,
    // password: sha512(values.password),
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    mode: values.mode
  };
  store.dispatch(fetchRegisterUser(values));// <----- este dispatch no deberia ser a algo como "fetchCreateUser"?, o como esta/estará definido en el services/user.ts ??
};