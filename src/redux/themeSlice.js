import { createSlice } from '@reduxjs/toolkit'
import { siteThemes } from '../constants/siteThemes';


const initialState = {
    themeItem: localStorage.getItem('theme') ? 
        JSON.parse(localStorage.getItem('theme')) : 'default',
    themeColors: localStorage.getItem('colors') ?
        JSON.parse(localStorage.getItem('colors')) : siteThemes['default'],
    clickedTheme: localStorage.getItem('selectedButtonIndex') ?
        JSON.parse(localStorage.getItem('selectedButtonIndex')) : null,
    codeEditorTheme: localStorage.getItem('codeEditorTheme') ?
    JSON.parse(localStorage.getItem('codeEditorTheme')) : null,
}

const themeSlice = createSlice({
    name: 'theme', 
    initialState, 
    reducers: {
        changeTheme(state, action) {
            state.themeItem = action.payload;
            state.themeColors = siteThemes[state.themeItem];
            localStorage.setItem('theme', JSON.stringify(state.themeItem));
            localStorage.setItem('colors', JSON.stringify(siteThemes[state.themeItem]))
        },
        saveClickedTheme(state, action) {
            state.clickedTheme = action.payload;
            localStorage.setItem('selectedButtonIndex', action.payload.toString());
        },
        changeColor(state, action) {
            let existingColors = localStorage.getItem('colors');
            state.themeColors[action.payload[1]] = action.payload[0];
            existingColors = existingColors ? JSON.parse(existingColors) : {};
            existingColors[action.payload[1]] = action.payload[0];
            localStorage.setItem('colors', JSON.stringify(existingColors));
        },
        changeCodeEditorTheme(state, action) {
            state.codeEditorTheme = action.payload;
            localStorage.setItem('codeEditorTheme', JSON.stringify(state.codeEditorTheme))
        }
    }
});

export const { changeTheme, saveClickedTheme, changeColor, changeCodeEditorTheme } = themeSlice.actions;

export default themeSlice.reducer;