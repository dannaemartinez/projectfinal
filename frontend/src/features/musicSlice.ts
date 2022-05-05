import { RootState } from "../app/store";
import { createSlice } from "@reduxjs/toolkit";
import { Singer } from "../models/singer";
import { Song } from "../models/song";
import { Album } from "../models/album";
import { Genre } from "../models/genre";

export interface MusicState {
  singers: Singer[];
  albums: Album[];
  songs: Song[];
  genres: Genre[];
}

const initialState: MusicState = {
  singers: [],
  albums: [],
  songs: [],
  genres: [],
};

export const MusicSlice = createSlice({
  name: "Music",
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setSingers: (state, action) => {
      state.singers = action.payload;
    },
    deleteSinger: (state, action) => {
      state.singers.splice(action.payload, 1);
    },
    addSinger: (state, action) => {
      state.singers.push(action.payload);
    },
    updateSinger: (state, action) => {
      state.singers[action.payload.index] = action.payload.genre;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    deleteGenre: (state, action) => {
      state.genres.splice(action.payload, 1);
    },
    addGenre: (state, action) => {
      state.genres.push(action.payload);
    },
    updateGenre: (state, action) => {
      state.genres[action.payload.index] = action.payload.genre;
    },
  },
});

export const musicSelector = (state: RootState) => state.music;

export const singersSelector = (state: RootState) =>
  musicSelector(state).singers;
export const albumsSelector = (state: RootState) => musicSelector(state).albums;
export const songsSelector = (state: RootState) => musicSelector(state).songs;
export const genresSelector = (state: RootState) => musicSelector(state).genres;

export const {
  setSingers,
  deleteSinger,
  addSinger,
  updateSinger,
  setAlbums,
  setSongs,
  setGenres,
  deleteGenre,
  addGenre,
  updateGenre,
} = MusicSlice.actions;

export default MusicSlice.reducer;