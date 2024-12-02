import { configureStore } from "@reduxjs/toolkit";
import { eventSlice } from "./Slice/eventSlice";
import { userSlice } from "./Slice/userSlice";

export const store = configureStore({
  reducer: {
    eventSlice: eventSlice.reducer,
    userSlice: userSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
