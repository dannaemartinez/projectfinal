import { Album } from "./album";
import { Singer } from "./singer";

export interface Song {
  id: string;
  name: string;
  singer: Singer;
  releaseDate: Date;
  album: Album;
  duration?: number;
  completeFile: string;
  previewFile: string;
  digitalPrice: number;
}

export interface SongCropped {
  id: string;
  name: string;
}