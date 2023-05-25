import { theme } from "../styles/theme";
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { nord } from '@uiw/codemirror-theme-nord';


export const siteThemes = {
  default: {
    primary: theme.colors.black[10],
    secondary: theme.colors.black[100],
    tertiary: theme.colors.black[80],
  },
  natural: {
    primary: "#E8EDE6",
    secondary: "#253825",
    tertiary: "#5B715B",
  },
  lavendar: {
    primary: "#EDE8FF",
    secondary: "#8466F2",
    tertiary: "#A48DF7",
  },
  urban: {
    primary: "#F0F2F1",
    secondary: "#21BFA2",
    tertiary: "#4E5D67",
  },
  ember: {
    primary: "#F2EEE9",
    secondary: "#F26A4B",
    tertiary: "#8C5649",
  },
};


export const codeEditorThemes = [
  'tokyoNight', 'atomone', 'dracula', 'nord'
]

export const codeEditorObj = {
  antone: atomone,
  nord: nord,
  tokyoNight: tokyoNight,
  dracula: dracula,
}