import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style that suits your terminal theme

const TerminalBlock = ({ codeLanguage, code, extra }) => {
  const terminalStyles = {
    padding: '10px',
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'monospace',
    borderRadius: '5px',
    minHeight: '200px',
    maxHeight: '300px', // Set a height for the terminal block
    overflow: 'scroll', // Enable scrolling if content exceeds the height
  };

  return (
    // <div style={terminalStyles}>
      <SyntaxHighlighter language={codeLanguage} style={materialDark} customStyle={{
        fontSize: '13px', // Adjust the font size as needed
      }} 
      className={`${extra} module-content scrollbar-hide`}
      >
        {code}
      </SyntaxHighlighter>
    // </div>
  );
};

export default TerminalBlock;
