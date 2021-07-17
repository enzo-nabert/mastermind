import { createGlobalStyle } from 'styled-components';

import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        list-style-type: none;
        font-family: 'Roboto', sans-serif;
    }
    
    html { 
        overflow:auto;
        scroll-behavior: smooth;
    }
    body {
        background-color: ${(props) => theme.color.background};
    }
`;

export default GlobalStyle;
