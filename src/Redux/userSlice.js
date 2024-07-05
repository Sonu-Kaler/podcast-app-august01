import { createSlice } from "@reduxjs/toolkit";

const initialState={
    users:null
}

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.users=action.payload;
        },
        clearUser:(state,action)=>{
            state.users=null;
        }
    }
})
export const {setUser,clearUser} = userSlice.actions;
export default userSlice.reducer;