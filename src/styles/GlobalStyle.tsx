import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: ${props => props.theme.colors.background.default};
    color: ${props => props.theme.colors.text.default};
    font-family: "pretendard", -apple-systems, sans-serif;
    transition: background-color 0.5s, color 0.5s;
}

a {
    text-decoration: none;
    color: inherit;
    }
`;

export default GlobalStyle;