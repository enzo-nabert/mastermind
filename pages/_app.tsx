import Context from 'components/context/context';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import { theme } from 'styles/theme';

function MyApp({ Component, pageProps }) {
    const [slots, setSlots] = useState(4);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Context.Provider value={{ slots, setSlots }}>
                <Component {...pageProps} />
            </Context.Provider>
        </ThemeProvider>
    );
}

export default MyApp;
