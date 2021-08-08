import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import "firebase/firestore";
import { useFirestoreDocData, useFirestore } from "reactfire";

// Models
export interface Note {
    NO_ID_FIELD: string;
    body?: string;
    title: string;
}

export interface NotesSliceModel {
  notes: Note[];
  loading: boolean;
  failure?: boolean;
}

// Initial state
const initialState: NotesSliceModel = {
    notes: [],
    loading: false,
    failure: false,
}

// Notes slice
const notesSlice = createSlice({
  name: 'notes',
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
    fetchSuccess: (state, action: PayloadAction<Note>) => {
      state.failure = false;
      state.notes.push(action.payload);
    },
    addNote: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    clearNotes: (state) => {
      state.notes = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { loading, fetchFailure, fetchSuccess, addNote, clearNotes } = notesSlice.actions;

// Async dispatches
export const fetchNotes = () => async (dispatch: any) => {
  dispatch(clearNotes());

  const notesSlice = useFirestore().collection("notes").doc("test");
  
  // TODO: Type 'unknown' is pretty sketchy... 
  const { status, data } = useFirestoreDocData<Note>(notesSlice);
  
  if (status === "loading") {
    dispatch(loading(true));
  }
  
  if (!data) {
    dispatch(fetchFailure());
    dispatch(loading(false));
  } else {
    dispatch(fetchSuccess(data));
    dispatch(loading(false));
  }
}

export default notesSlice.reducer;