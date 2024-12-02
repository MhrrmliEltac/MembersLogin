import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { supabase } from "../../../../libs/supabase";

interface Event {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
}

interface CounterState {
  event: Event[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CounterState = {
  event: [],
  status: "idle",
  error: null,
};

export const fetchEvents = createAsyncThunk("event/fetchEvents", async () => {
  const { data, error } = await supabase.from("events").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data.map((item) => ({
    id: item.id as number,
    title: item.title as string,
    start_time: item.start_time as string,
    end_time: item.end_time as string,
  }));
});

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.event = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch events";
        state.event = [];
      });
  },
});

export const selectEvents = (state: RootState) => state.eventSlice.event;
export const selectEventStatus = (state: RootState) => state.eventSlice.status;
export const selectEventError = (state: RootState) => state.eventSlice.error;

export default eventSlice.reducer;
