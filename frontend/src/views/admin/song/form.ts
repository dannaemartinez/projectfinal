import * as Yup from "yup";
import { store } from "../../../app/store";
import { fetchAddSong, fetchDeleteSong, fetchUpdateSong } from "../../../services/song";

export interface CreateSongDTO {
  name?: string,
  previewFile?: string,
  completeFile?: string,
  releaseDate: Date,
  duration?: number,
  digitalPrice?: number,
  albumId?: number,
  singerId?: number
}
export interface UpdateSongDTO {
  id?: number,
  name?: string,
  previewFile?: string,
  completeFile?: string,
  releaseDate: Date,
  duration?: number,
  digitalPrice?: number,
  albumId?: number,
  singerId?: number
}

export interface DeleteSongDTO {
  id?: number
}

export interface SongPosition {
  id: string;
  index: number;
}

export const validationSchemaCreate: Yup.SchemaOf<CreateSongDTO> = Yup.object(
  {
    name: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("El nombre de la canción es requerido"),
    previewFile: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("La imagen de la canción es requerida"),
    completeFile: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("La imagen de la canción es requerida"),
    releaseDate: Yup.date().required("La fecha de lanzamiento es requerida"),
    duration: Yup.number().required("La duración es requerida"),
    digitalPrice: Yup.number()
      .max(999.99, "El precio maximo de la canción es 999.99").min(0, "El precio minimo del album es 0")
      .required("El precio de la canción es requerido"),
    albumId: Yup.number().required("El album es requerido"),
    singerId: Yup.number().required("El cantante es requerido")
  }
);

export const validationSchemaUpdate: Yup.SchemaOf<UpdateSongDTO> = Yup.object(
  {
    id: Yup.number().required(),
    name: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("El nombre de la canción es requerido"),
    previewFile: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("La imagen de la canción es requerida"),
    completeFile: Yup.string()
      .min(3, "Tienes que escribir al menos 3 caracteres")
      .required("La imagen de la canción es requerida"),
    releaseDate: Yup.date().required("La fecha de lanzamiento es requerida"),
    duration: Yup.number().required("La duración es requerida"),
    digitalPrice: Yup.number()
      .max(999.99, "El precio maximo de la canción es 999.99").min(0, "El precio minimo del album es 0")
      .required("El precio de la canción es requerido"),
    albumId: Yup.number().required("El album es requerido"),
    singerId: Yup.number().required("El cantante es requerido")
  }
);

export const initialValuesCreate: CreateSongDTO = {
  name: undefined,
  previewFile: undefined,
  completeFile: undefined,
  releaseDate: new Date(),
  duration: undefined,
  digitalPrice: undefined,
  albumId: undefined,
  singerId: undefined
};
export const initialValuesUpdate: UpdateSongDTO = {
  id: undefined,
  name: undefined,
  previewFile: undefined,
  completeFile: undefined,
  releaseDate: new Date(),
  duration: undefined,
  digitalPrice: undefined,
  albumId: undefined,
  singerId: undefined
};

export const createSong = (values: CreateSongDTO) => {
  store.dispatch(fetchAddSong(values));
};

export const updateSong = (
  values: UpdateSongDTO,
  songPosition: SongPosition
) => {
  store.dispatch(fetchUpdateSong(values, songPosition));
};

export const deleteSong = (values: DeleteSongDTO, storeIndex: number ) => {
  store.dispatch(fetchDeleteSong(values, storeIndex));
};