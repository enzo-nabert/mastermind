import Context from 'components/context/context';
import DefaultLayout from 'components/layouts/default';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Button,
    Create,
    Menu,
    MenuItem,
    MenuTitle,
    MenuWrapper,
    Section
} from 'styles/Home/Home.style';

export default function Home() {
    const nb = [4, 5, 6, 7, 8];
    const { slots, setSlots } = useContext(Context);

    const slotsHandler = (id: number) => {
        setSlots(() => id);
    };

    const { t } = useTranslation();
    return (
        <DefaultLayout>
            <Section>
                <Create>
                    <Menu>
                        <MenuTitle>{t('menu_slots')}</MenuTitle>
                        <MenuWrapper>
                            {(() => {
                                const items = [];

                                for (let i = 4; i < 9; i++) {
                                    items.push(
                                        <MenuItem
                                            key={i}
                                            className={i === slots ? 'selected' : ''}
                                            onClick={() => slotsHandler(i)}>
                                            {i}
                                        </MenuItem>
                                    );
                                }
                                return items;
                            })()}
                        </MenuWrapper>
                    </Menu>
                    <Link href="/game">
                        <Button>Play</Button>
                    </Link>
                </Create>
            </Section>
        </DefaultLayout>
    );
}
