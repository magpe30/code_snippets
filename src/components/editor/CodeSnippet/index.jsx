import { useState, createRef } from 'react';
import { useSelector } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
import Draggable from 'react-draggable';
import { javascript } from '@codemirror/lang-javascript';
import { codeEditorObj } from '../../../constants/siteThemes';
import { useScreenshot, createFileName } from "use-react-screenshot";
import styled from "@emotion/styled";

const CodeSnippetContainer = styled.div`
    width: 100%;
    margin-top: 40px;
    padding: 30px;
    display: flex;
    justify-content: center;
`;

const SnippetBackground = styled.div`
    width: 700px;
    height: 500px;
    background: ${props => `linear-gradient(322.24deg,${props.color} -20.38%, 
        ${props.secondary} 67.84%)`};
`;

const Window = styled.div`
    margin: 25px 60px;
    width: 400px;
    border-radius: 6px;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const WindowHeader = styled.div`
    height: 25px;
    background: Gainsboro;
    position: relative;
`;
  
const ActionButtons = styled.div`
    position: absolute;
    top: 50%;
    left: 10px;
    margin-top: -5px;
    width: 10px;
    height: 10px;
    background: Crimson;
    border-radius: 50%;
    box-shadow: 15px 0 0 Orange, 30px 0 0 LimeGreen;
`
const Buttons = styled.div`
    display: flex;
`;

const Download =styled.button`
    margin: auto;
    padding: 10px 15px;
    border:none;
    border-radius: 5px;
    background: #FFFFFF;
    cursor:pointer;
    font-weight: 600;
    font-size: 16px;
`;

const Textarea = styled.textarea`
    font-size: 18px;
    min-height: 100px;
    min-width: 400px;
    background: none;
    border: none;
    font-weight: 600;
    color: ${props => props.color}

`

const CodeSnippet = () => {
    const theme = useSelector(state => state.theme);
    const colors = theme?.themeColors;
    const codeTheme = theme?.codeEditorTheme;

    const ref = createRef(null);
    const [image, takeScreenShot] = useScreenshot({
      type: "image/jpeg",
      quality: 1.0
    });

    const download = (image, { name = "img", extension = "jpg" } = {}) => {
      const a = document.createElement("a");
      a.href = image;
      a.download = createFileName(extension, name);
      a.click();
    };

    const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
   
    return (
        <>
            <Buttons>
                <Download
                    onClick={downloadScreenshot}
                >Download</Download>
            </Buttons>
            <CodeSnippetContainer ref={ref}>
                <SnippetBackground color={colors?.secondary} secondary={colors?.tertiary}>
                <Window>
                    <WindowHeader>
                        <ActionButtons />
                    </WindowHeader>
                    
                    <CodeMirror
                        value="//your code here 
                            console.log('hello world!');
                        "
                        height="240px"
                        theme={codeEditorObj[codeTheme]}
                        extensions={[javascript({ jsx: true })]}
                    />
                        
                </Window>
                <Draggable>
                    <Textarea
                     placeholder="add any text here"
                     color={colors.primary}
                    />
                </Draggable>
                </SnippetBackground>
            </CodeSnippetContainer>
        </>
    )
};

export default CodeSnippet;