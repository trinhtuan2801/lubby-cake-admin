import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserData, UserFromDb } from '../../api/user';

interface InitialState {
  userData?: UserData;
}

const initialState: InitialState = {
  userData: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData | undefined>) => {
      state.userData = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
