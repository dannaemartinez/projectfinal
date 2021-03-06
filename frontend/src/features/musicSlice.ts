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
  selectedSong?: Song;
}

const initialState: MusicState = {
  singers: [],
  albums: [],
  songs: [],
  genres: [],
  selectedSong: undefined,
};

export const MusicSlice = createSlice({
  name: "Music",
  initialState,
  reducers: {
    setSelectedSong: (state, action) => {
      state.selectedSong = action.payload;
    },
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    deleteSong: (state, action) => {
      state.songs = removeByIdAttrib(state.songs, action.payload.id);
    },
    addSong: (state, action) => {
      state.songs.push(action.payload);
    },
    updateSong: (state, action) => {
      state.songs[action.payload.index] = action.payload.genre;
    },
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    deleteAlbum: (state, action) => {
      state.albums = removeByIdAttrib(state.albums, action.payload.id);
    },
    addAlbum: (state, action) => {
      state.albums.push(action.payload);
    },
    updateAlbum: (state, action) => {
      state.albums[action.payload.index] = action.payload.genre;
    },
    setSingers: (state, action) => {
      state.singers = action.payload;
    },
    deleteSinger: (state, action) => {
      state.singers = removeByIdAttrib(state.singers, action.payload.id);
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
      state.genres = removeByIdAttrib(state.genres, action.payload.id);
    },
    addGenre: (state, action) => {
      state.genres.push(action.payload);
    },
    updateGenre: (state, action) => {
      state.genres[action.payload.index] = action.payload.genre;
    },
  },
});

const removeByIdAttrib = (previousState: any[], id: number) => {
  return previousState.filter(function (obj) {
    return obj.id !== id.toString();
  });
}

export const musicSelector = (state: RootState) => state.music;

export const singersSelector = (state: RootState) => musicSelector(state).singers;
export const albumsSelector = (state: RootState) => musicSelector(state).albums;
export const songsSelector = (state: RootState) => musicSelector(state).songs;
export const selectedSongSelector = (state: RootState) => musicSelector(state).selectedSong;
export const genresSelector = (state: RootState) => musicSelector(state).genres;

export const {
  setSingers,
  deleteSinger,
  addSinger,
  updateSinger,
  setAlbums,
  deleteAlbum,
  addAlbum,
  updateAlbum,
  setSongs,
  deleteSong,
  addSong,
  updateSong,
  setGenres,
  deleteGenre,
  addGenre,
  updateGenre,
  setSelectedSong
} = MusicSlice.actions;

export default MusicSlice.reducer;