import * as Yup from "yup";
import { store } from "../../../app/store";
import { fetchAddAlbum, fetchDeleteAlbum, fetchUpdateAlbum } from "../../../services/album";

export interface CreateAlbumDTO {
  name?: string,
  image?: string,
  physicalPrice?: number,
  releaseDate: Date,
  stock?: number,
  genre: {
    id?: number
  },
  singer: {
    id?: number
  }
}
export interface UpdateAlbumDTO {
  id?: number
  name?: string,
  image?: string,
  physicalPrice?: number,
  releaseDate: Date,
  stock?: number,
  genre: {
    id?: number
  },
  singer: {
    id?: number
  }
}

export interface DeleteAlbumDTO {
  id?: number
}

export interface AlbumPosition {
  id: string;
  index: number;
}

export const validationSchemaCreate: Yup.SchemaOf<CreateAlbumDTO> = Yup.object(
  {
    name: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("El nombre del album es requerido"),
    image: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("La imagen del album es requerida"),
    physicalPrice: Yup.number()
      .max(999.99, "El precio maximo del album es 999.99").min(0, "El precio minimo del album es 0")
      .required("El precio del album es requerido"),
    releaseDate: Yup.date().required("La fecha de lanzamiento es requerida"),
    stock: Yup.number().required("El stock del album es requerido"),
    genre: Yup.object({
      id: Yup.number().required("El genero es requerido")
    }),
    singer: Yup.object({
      id: Yup.number().required("El cantante es requerido")
    })
  }
);

export const validationSchemaUpdate: Yup.SchemaOf<UpdateAlbumDTO> = Yup.object(
  {
    id: Yup.number().required(),
    name: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("El nombre del album es requerido"),
    image: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("La imagen del album es requerida"),
    physicalPrice: Yup.number()
      .max(999.99, "El precio maximo del album es 999.99").min(0, "El precio minimo del album es 0")
      .required("El precio del album es requerido"),
    releaseDate: Yup.date().required("La fecha de lanzamiento es requerida"),
    stock: Yup.number().required("El stock del album es requerido"),
    genre: Yup.object({
      id: Yup.number().required("El genero es requerido")
    }),
    singer: Yup.object({
      id: Yup.number().required("El cantante es requerido")
    })
  }
);

export const initialValuesCreate: CreateAlbumDTO = {
  name: undefined,
  image: undefined,
  physicalPrice: undefined,
  releaseDate: new Date(),
  stock: undefined,
  genre: {
    id: undefined
  },
  singer: {
    id: undefined
  }
};
export const initialValuesUpdate: UpdateAlbumDTO = {
  id: undefined,
  name: undefined,
  image: undefined,
  physicalPrice: undefined,
  releaseDate: new Date(),
  stock: undefined,
  genre: {
    id: undefined
  },
  singer: {
    id: undefined
  }
};

export const createAlbum = (values: CreateAlbumDTO) => {
  store.dispatch(fetchAddAlbum(values));
};

export const updateAlbum = (
  values: UpdateAlbumDTO,
  AlbumPosition: AlbumPosition
) => {
  store.dispatch(fetchUpdateAlbum(values, AlbumPosition));
};

export const deleteAlbum = (values: DeleteAlbumDTO, storeIndex: number ) => {
  store.dispatch(fetchDeleteAlbum(values, storeIndex));
};