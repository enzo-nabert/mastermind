import { createGlobalStyle } from 'styled-components';

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
        background-color: #FFF8A2;
    }
`;

export default GlobalStyle;
