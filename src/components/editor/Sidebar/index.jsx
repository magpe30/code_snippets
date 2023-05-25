import { useState } from 'react';
import StyleIcon from '@mui/icons-material/Style';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { theme } from '../../../styles/theme';
import { motion } from "framer-motion";
import EditorMenu from './EditorMenu';
import styled from "styled-components";

// Component Styles

const Root = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EditorButton = styled(motion.button)`
  background: ${props => props.background};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;
  position: relative;
  &:hover {
    background: ${theme.colors.black[10]};
  }
`;

/** Sidebar view of the Editor page */
function Sidebar({ colors }) {
  const [showEditorMenu, setShowEditorMenu] = useState(false);
 
  return <Root>
    <EditorButton 
      onClick={() => setShowEditorMenu(!showEditorMenu)} 
      background={showEditorMenu ? colors?.primary : "none"}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.3 },
      }}
    >
      <ColorLensIcon sx={{ color: `${colors?.secondary}` }}/>
    </EditorButton>
    {showEditorMenu && <EditorMenu show={showEditorMenu}/>}
  </Root>;
}

export default Sidebar;
