import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../store";
import { supabase } from "../../../../libs/supabase";

interface User {
  id: number;
  name: string;
  surname: string;
  age: number;
  gender: string;
  speciality: string;
  course: string;
  higher_education: string;
  university: string;
  work: string;
  latest_read_book: string;
}
interface SearchUser {
  name: string;
  surname: string;
}

interface FilterUser {
  name: string;
  surname: string;
  age: number;
  gender: string;
  specialty?: string;
  course?: string;
  higher_education?: string;
  university?: string;
  work?: string;
}

interface UserState {
  user: User[];
  allUser: User[];
  searchUser: SearchUser[];
  filterUser: FilterUser[];
  status: "idle" | "loading" | "succeeded" | "failed";
  allUserStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: [],
  allUser: [],
  searchUser: [],
  filterUser: [],
  status: "idle",
  allUserStatus: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk<
  User[],
  { from: number; to: number },
  { dispatch: AppDispatch; state: RootState }
>("user/fetchUsers", async ({ from, to }) => {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("id", { ascending: true })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
});

export const fetchAllUser = createAsyncThunk<
  User[],
  void,
  { dispatch: AppDispatch; state: RootState }
>("user/fetchAllUser", async () => {
  const { data, error } = await supabase.from("members").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
});

export const fetchSearchUser = createAsyncThunk<
  SearchUser[],
  { searchInp: any },
  { dispatch: AppDispatch; state: RootState }
>("user/fetchSearchUser", async ({ searchInp }) => {
  const { data, error } = await supabase
    .from("members")
    .select()
    .ilike("name", `%${searchInp}%`)
    .range(0, 6);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
});

export const sendDataUser = createAsyncThunk<User[], { newMember: User }>(
  "users/postDataUser",
  async ({ newMember }) => {
    const { error } = await supabase.from("members").insert(newMember);
    if (error) {
      console.log(error);
      throw error;
    }
    return [newMember];
  }
);

export const filteredUser = createAsyncThunk<
  FilterUser[],
  { filterBy: string },
  { state: RootState }
>("userSlice/filteredUser", async ({ filterBy }, { getState }) => {
  const { allUser } = getState().userSlice;
  if (filterBy === "name") {
    return [...allUser].sort((a, b) =>
      a.name.localeCompare(b.name)
    ) as FilterUser[];
  }
  if (filterBy === "surname") {
    return [...allUser].sort((a, b) =>
      a.surname.localeCompare(b.surname)
    ) as FilterUser[];
  }
  if (filterBy === "work") {
    return [...allUser].sort((a, b) =>
      a.work.localeCompare(b.work)
    ) as FilterUser[];
  }
  return allUser as FilterUser[];
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch users";
      });
    builder
      .addCase(fetchAllUser.pending, (state) => {
        state.allUserStatus = "loading";
      })
      .addCase(
        fetchAllUser.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.allUserStatus = "succeeded";
          state.allUser = action.payload;
        }
      )
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.allUserStatus = "failed";
        state.error = action.error.message ?? "Failed to fetch users";
      });
    builder
      .addCase(fetchSearchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSearchUser.fulfilled,
        (state, action: PayloadAction<SearchUser[]>) => {
          state.status = "succeeded";
          state.searchUser = action.payload;
        }
      )
      .addCase(fetchSearchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch users";
      });
    builder
      .addCase(filteredUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        filteredUser.fulfilled,
        (state, action: PayloadAction<FilterUser[]>) => {
          state.status = "succeeded";
          state.filterUser = action.payload;
        }
      )
      .addCase(filteredUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch users";
      });
  },
});
export const selectUsers = (state: RootState) => state.userSlice.user;
export const selectUserStatus = (state: RootState) => state.userSlice.status;

export default userSlice.reducer;
