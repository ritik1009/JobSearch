import { createSlice } from "@reduxjs/toolkit";

//Here we creating a user Slice that will act as a model for our store which will contain the variables and the functions 
export const userSlice = createSlice({
		// The name of our slice i think the name of the store
    name:"user",
		// Then we are setting the initial values of the variable we will be 
		// assigning to the variable that we will use.
    initialState:{
        email:'',
        error:false,
        pending:false,
        currentUser:{},
        job:{},
        jobSearchResult:{},
        search:'',
      },
		// The reducers will contain our function that is responsible for the updation 
		// of the data using this function we can update the value of the variables.
    reducers:{
		// The update is the function that we will call when we need to update the variable data
		// In this we are passing to params i.e. state and action. The state contains the present data
		// The action contains the data that we want to update i.e action contains the payload that
		// That will contain the data that the user has passed and will be used to update.
        updateEmail:(state,action)=>{
            state.email = action.payload.email
        },
        updateStart:(state)=>{
          state.pending=true
          state.error =false
        },
        updateError:(state)=>{
            state.error = true;
            state.pending=false;
        },
        updateUserCredentials:(state,action)=>{
            state.pending = false;
            state.currentUser = action.payload
        },
        updateJob:(state,action)=>{
          state.job = action.payload.data
        },
        updateTotalJob:(state,action)=>{
          state.jobSearchResult = action.payload.data
          state.search = action.payload.search
        }
        
    }
})

export const { updateEmail,updateError,updateStart,updateUserCredentials,updateJob,updateTotalJob} = userSlice.actions;

export default userSlice.reducer;