import DefaultLayout from 'components/layouts/default';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Create, Menu, MenuItem, MenuTitle, MenuWrapper, Section } from 'styles/Home/Home.style';

export default function Home() {
    const nb = [4, 5, 6, 7, 8];
    const diff = ['easy', 'hard'];
    const [slots, setSlots] = useState(4);
    const [difficulty, setDifficulty] = useState('easy');

    const slotsHandler = (id: number) => {
        setSlots(() => id);
    };

    const difficultyHandler = (diff: string) => {
        setDifficulty(() => diff);
    };

    const { t } = useTranslation();
    return (
        <DefaultLayout>
            <Section>
                <Create>
                    <Menu>
                        <MenuTitle>{t('menu_slots')}</MenuTitle>
                        <MenuWrapper>
                            {nb.map((nbS: any, i: number) => (
                                <MenuItem
                                    key={i}
                                    className={nbS === slots ? 'selected' : ''}
                                    onClick={() => slotsHandler(nbS)}>
                                    {nbS}
                                </MenuItem>
                            ))}
                        </MenuWrapper>
                    </Menu>
                    <Menu>
                        <MenuTitle>{t('menu_difficulty')}</MenuTitle>
                        <MenuWrapper>
                            {diff.map((d: any, i: number) => (
                                <MenuItem
                                    key={i}
                                    className={d === difficulty ? 'selected' : ''}
                                    onClick={() => difficultyHandler(d)}>
                                    {t(`menu_${d}`)}
                                </MenuItem>
                            ))}
                        </MenuWrapper>
                    </Menu>
                </Create>
            </Section>
        </DefaultLayout>
    );
}
