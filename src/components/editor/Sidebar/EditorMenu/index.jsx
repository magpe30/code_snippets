import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from "framer-motion";
import { theme } from '../../../../styles/theme';
import { siteThemes, codeEditorThemes } from '../../../../constants/siteThemes';
import { capitaliseStr } from '../../../../utilities';
import { changeTheme, saveClickedTheme, changeColor, changeCodeEditorTheme } from '../../../../redux/themeSlice';
import { HexColorPicker } from "react-colorful";
import styled from "styled-components";

// Component Styles

const Root = styled(motion.root)`
  border: 1px solid  ${theme.colors.black[40]};
  border-radius: 4px;
  height: 100%;
  width: 100%;
  max-width: 225px;
  max-height: 270px;
  position: absolute;
  top: 50%;
  z-index: 999;
  transform: translateX(calc(-60% - 8px)) translateY(-50%) translateZ(0px);
  background-color: ${theme.colors.white[100]};
`;

const Container = styled.div`
  padding: 16px;
`
const Header = styled.div`
    font-size: 13px;
    font-weight: 600;
`
const ThemeContainer = styled.div`
    margin-top: 15px;
`
const SubHeader = styled.p`
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 8px;
`
const ThemeDropdownButton = styled(motion.button)`
    background-color: ${props => props.background};
    border: none;
    border-radius: 4px;
    color: ${props => props.color};
    cursor: pointer;
    width: 100%;
    height: 100%;
    padding: 8px 14px;
    position: relative;
    text-align: left;
`

const DropdownContainer = styled(motion.div)`
    background-color: ${theme.colors.white[100]}; 
    max-height: 85px;
    overflow: scroll;
    position: absolute;
    border-radius: 4px;
    width: 85%;
`

const Item = styled.button`
    background: ${props => props.background};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: none;
    padding: 8px 14px;
    margin: 2px;

    &:hover {
        background: ${theme.colors.black[10]};
    }
`

const ItemHeader = styled.p`
    text-align: left;
`
const Colors = styled.div`
    display: flex;
`

const ColorsItem = styled.div`
    width: 24px;
    height: 24px;
    background-color: ${props => props.color};
    border: 1px solid  ${theme.colors.black[40]};
    border-radius: 100%;
    margin-right: 2px;
`

const Picker = styled.div`
    position: absolute;
    top: 0;
    right: 100%;
`

/** Sidebar view of the Editor page */
function EditorMenu({ show }) {
  const [dropdown, setDropdown] = useState(false);
  const [codeEditorDropdown, setCodeEditorDropdown] = useState(false);
  const [colorPicker, setColorPicker] = useState(null);
  const [, setColor] = useState(null);
  const themeState = useSelector(state => state.theme);
  const colors = themeState?.themeColors;
  const savedIndex = themeState?.clickedTheme;
  const codeTheme = themeState?.codeEditorTheme;
  const dispatch = useDispatch();

  const handleThemeChange = (theme) => {
    dispatch(changeTheme(theme));
  }

  const handleClickedItem = (index) => {
    dispatch(saveClickedTheme(index));
  }

  const handleChangeColor = (pickedColor) => {
    dispatch(changeColor([pickedColor, colorPicker]))
  }

  const changeCodeThemes = (codeTheme) => {
    dispatch(changeCodeEditorTheme(codeTheme));
  }

  return <Root animate={show ? { y: -100, x: -140, scale: 1 } : {opcaity: 0}}>
    <Container>
        <Header>Snippet Styles</Header>
        <ThemeContainer>
            <SubHeader>Theme</SubHeader>
            <ThemeDropdownButton 
              onClick={() => setDropdown(!dropdown)} 
              background={colors?.primary} 
              color={colors?.secondary}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
            >
               {capitaliseStr(themeState?.themeItem)}
            </ThemeDropdownButton>
            {dropdown && 
                <DropdownContainer animate={dropdown ? {y:8} : {y: -8}}>
                    {
                        Object.keys(siteThemes).filter((type) => type !== 'default').map((themesColor, index) => 
                        <Item key={index} 
                            onClick={() => {
                                handleThemeChange(themesColor)
                                handleClickedItem(index);
                            }}
                            background={savedIndex === index ? theme.colors.black[10] : 'none' }
                        >
                            <ItemHeader>
                                {capitaliseStr(themesColor)}
                            </ItemHeader>
                            <Colors>
                                {
                                    Object.keys(siteThemes[themesColor]).map((key) =>  
                                      <ColorsItem color={siteThemes[themesColor][key]} key={key}/>
                                    )
                                }
                            </Colors>
                        </Item>
                        )
                    }
                </DropdownContainer>
            }
        </ThemeContainer>
        <ThemeContainer>
            <SubHeader>Theme Colors</SubHeader>
            <Colors>
                {
                    Object.keys(colors).map((key) =>  
                        <ColorsItem 
                            color={colors[key]} 
                            key={key}
                            onClick={() => setColorPicker(key)}
                        />
                    )
                }
                {colorPicker && 
                  <Picker>
                    <HexColorPicker color={siteThemes[themeState?.themeItem][colorPicker]} onChange={(color) => {
                        setColor(color);
                        handleChangeColor(color);
                    }} />
                  </Picker>
                }
            </Colors>
        </ThemeContainer>
        <ThemeContainer>
            <SubHeader>Code editor themes</SubHeader>
            <ThemeDropdownButton 
              onClick={() => setCodeEditorDropdown(!codeEditorDropdown)} 
              background={colors?.primary} 
              color={colors?.secondary}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
            >
               {capitaliseStr(codeTheme)}
            </ThemeDropdownButton>
            {codeEditorDropdown && 
                <DropdownContainer animate={dropdown ? {y:1} : {y: -1}}>
                    {
                        codeEditorThemes.map((codeTheme, index) => 
                        <Item key={index} 
                            onClick={() => changeCodeThemes(codeTheme)}
                            background='none'
                        >
                            <ItemHeader>
                                {capitaliseStr(codeTheme)}
                            </ItemHeader>
                        </Item>
                        )
                    }
                </DropdownContainer>
            }
        </ThemeContainer>
    </Container>
  </Root>;
}

export default EditorMenu;