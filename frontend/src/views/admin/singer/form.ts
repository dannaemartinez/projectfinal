import * as Yup from "yup";
import { store } from "../../../app/store";
import { fetchAddSinger, fetchUpdateSinger } from "../../../services/singer";

export interface CreateSingerDTO {
  name?: string,
  stageName?: string,
  lastName?: string,
  nationality?: string,
  image?: string,
}
export interface UpdateSingerDTO {
  name?: string,
  stageName?: string,
  lastName?: string,
  nationality?: string,
  image?: string,
}

export interface SingerPosition {
  id: string;
  index: number;
}

export const validationSchemaCreate: Yup.SchemaOf<CreateSingerDTO> = Yup.object(
  {
    name: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("El nombre del cantante es requerido"),
    stageName: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("El nombre del cantante es requerido"),
    lastName: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("El nombre del cantante es requerido"),
    nationality: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("El nombre del cantante es requerido"),
      image: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      // .required("La imagen del cantante es requerida"),
  }
);

export const validationSchemaUpdate: Yup.SchemaOf<UpdateSingerDTO> = Yup.object(
  {
    id: Yup.number().required(),
    name: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("El nombre del cantante es requerido"),
    stageName: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("El nombre del cantante es requerido"),
    lastName: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("El nombre del cantante es requerido"),
    nationality: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("El nombre del cantante es requerido"),
      image: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      // .required("La imagen del cantante es requerida"),
  }
);

export const initialValuesCreate: CreateSingerDTO = {
  name: undefined,
  stageName: undefined,
  lastName: undefined,
  nationality: undefined,
  image: undefined
};
export const initialValuesUpdate: UpdateSingerDTO = {
  name: undefined,
  stageName: undefined,
  lastName: undefined,
  nationality: undefined,
  image: undefined
};

export const createSinger = (values: CreateSingerDTO) => {
  store.dispatch(fetchAddSinger(values));
};

export const updateSinger = (
  values: UpdateSingerDTO,
  SingerPosition: SingerPosition
) => {
  store.dispatch(fetchUpdateSinger(values, SingerPosition));
};