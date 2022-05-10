import * as Yup from "yup";
import { store } from "../../../app/store";
import { fetchAddGenre, fetchUpdateGenre } from "../../../services/genre";

export interface CreateGenreDTO {
  name?: string
}
export interface UpdateGenreDTO {
  id?: number,
  name?: string
}

export interface GenrePosition {
  id: string;
  index: number;
}

export const validationSchemaCreate: Yup.SchemaOf<CreateGenreDTO> = Yup.object({
  name: Yup.string()
    .min(3, "Tienes que escribir al menos 3 caracteres")
    .max(10, "Tienes que escribir menos de 10 caracteres")
    .required("El nombre del genero es requerido"),
});

export const validationSchemaUpdate: Yup.SchemaOf<UpdateGenreDTO> = Yup.object({
  id: Yup.number().required(),
  name: Yup.string()
    .min(3, "Tienes que escribir al menos 3 caracteres")
    .max(10, "Tienes que escribir menos de 10 caracteres")
    .required("El nombre del genero a actualizar es requerido"),
});

export const initialValuesCreate: CreateGenreDTO = {
  name: undefined,
};
export const initialValuesUpdate: UpdateGenreDTO = {
  id: undefined,
  name: undefined,
};

export const createGenre = (values: CreateGenreDTO) => {
  store.dispatch(fetchAddGenre(values));
};

export const updateGenre = (
  values: UpdateGenreDTO,
  genrePosition: GenrePosition
) => {
  console.log(values);
  store.dispatch(fetchUpdateGenre(values, genrePosition));
};