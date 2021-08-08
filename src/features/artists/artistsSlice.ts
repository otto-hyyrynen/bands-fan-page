import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import "firebase/firestore";
import firebase from "firebase/app";
// import { useFirestoreDocData, useFirestore } from "reactfire";

// Models
export interface Artist {
    id: string;
    name: string;
    genre?: string;
}

export interface ArtistsSliceModel {
  artists: Artist[];
  loading: boolean;
  failure?: boolean;
}

// Initial state
const initialState: ArtistsSliceModel = {
    artists: [],
    loading: false,
    failure: false,
}

// Artists slice
const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
    },
    fetchFailure: (state) => {
        // TODO: Would be nice to have an actual error message to display,
        // in which case the type of state.failure would be string | undefined
        state.failure = true;
    },
    fetchSuccess: (state, action: PayloadAction<Artist[]>) => {
      state.failure = false;
      state.artists = action.payload;
    },
    clearArtists: (state) => {
      state.artists = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { loading, fetchFailure, fetchSuccess, clearArtists } = artistsSlice.actions;

// Async dispatches
export const fetchArtists = () => async (dispatch: any) => {
    dispatch(loading(true));

    const db = firebase.firestore();

    db.collection("artists").onSnapshot((snapshot) => {
      const artistsData: Artist[] = [];

      snapshot.forEach((doc) => {
          const artistData: Artist = {
              id: doc.id,
              name: doc.data().name,
              genre: doc.data().genre,
          }

          artistsData.push(artistData);
      });

      if (artistsData.length > 0) {
          dispatch(fetchSuccess(artistsData));
      }

      dispatch(loading(false));
    });
}

export default artistsSlice.reducer;