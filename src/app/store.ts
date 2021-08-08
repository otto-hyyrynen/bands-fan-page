import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import notesReducer from '../features/notes/notesSlice';
import artistsReducer from '../features/artists/artistsSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    artists: artistsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
