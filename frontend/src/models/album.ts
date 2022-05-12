import { Genre } from "./genre";
import { Singer } from "./singer";
import { SongCropped } from "./song";

export interface Album {
  id: string;
  name: string;
  singer: Singer;
  releaseDate: Date;
  physicalPrice: number;
  genre: Genre;
  stock: number;
  image: string;
  songs: SongCropped[];
}