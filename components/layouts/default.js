/* eslint-disable @typescript-eslint/no-var-requires */
import i18n from 'i18next';
import { useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import { Header, Select } from 'styles/Header.style';
const fr_FR = require('lang/fr_FR.json');
const en_US = require('lang/en_US.json');

i18n.use(initReactI18next).init({
    resources: {
        fr: {
            translation: fr_FR
        },
        en: {
            translation: en_US
        }
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
        escapeValue: false
    }
});

export default function defaultLayout({ children }) {
    const [lang, setLang] = useState('en');

    const selectHandler = (e) => {
        setLang(e.target.value);
    };
    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    return (
        <>
            <Header>
                {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                <Select value={lang} onChange={(e) => selectHandler(e)}>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                </Select>
            </Header>
            <main>{children}</main>
        </>
    );
}
