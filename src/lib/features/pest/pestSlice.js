import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    location : [
        { name : '집' , imgName : '🏡',  place : '집'},
        { name : '산' , imgName : '⛰️',  place : '산'},
        { name : '바닷가' , imgName : '🌊',  place : '바닷가'},
    ],
    newinput : [],
    apiResponse : []
}

const pestSlice = createSlice({
    name: 'pest',
    initialState,
    reducers : {
        resetInput: (state) => {
            state.newinput = ""

        },
        pickInput: (state, action) => {
            const locationIndex = state.location.findIndex(location => location.name === action.payload)
            if (locationIndex !== -1) {
                state.newinput = [...state.newinput, state.location[locationIndex]];
            }

        },
        aiRes: (state, action) => {
            state.apiResponse.push(action.payload)
        }
    }
})


export const {resetInput,pickInput, aiRes} = pestSlice.actions
export default pestSlice.reducer