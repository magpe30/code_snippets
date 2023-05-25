import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { theme } from "../styles/theme";
import styled from "@emotion/styled";
import Sidebar from "../components/editor/Sidebar";
import CodeSnippet from '../components/editor/CodeSnippet';
import Site from "../components/editor/Site";


// Component Styles

const Root = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1700px;
  margin: 0 auto;
  height: 100vh;
  padding: 0;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const RootContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  transition: height 100ms linear;
  padding: 32px;
`;

const SiteWrapper = styled(motion.div)`
  flex: 1;
  height: 100%;
  min-height: 600px;
  overflow: hidden;
  border: 1px solid ${theme.colors.black[40]};
  border-radius: 8px;
  background-color: ${props => props.color}; // Change to Primary color
  padding: 25px;
  align-items: center;
  justify-content: center;
`;

const SideBarWrapper = styled(motion.div)`
  width: 64px;
  height: 100%;
`;

/** Root Editor View */
function Editor() {
  const theme = useSelector(state => state.theme);
  const colors = theme?.themeColors;

  return (
    <Root>
      <RootContent>
        <SiteWrapper layout color={colors?.primary}>
          <Site colors={colors} />
          <CodeSnippet />
        </SiteWrapper>
        <SideBarWrapper layout>
          <Sidebar colors={colors} />
        </SideBarWrapper>
      </RootContent>
    </Root>
  );
}

export default Editor;
