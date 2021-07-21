import Context from 'components/context/context';
import DefaultLayout from 'components/layouts/default';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Board,
    Code,
    CodeContainer,
    ColorButton,
    ColorContainer,
    EndContainer,
    EndText,
    GameSection,
    Infos,
    InfosText,
    PlayButton,
    Row,
    Spot
} from 'styles/Game/Game.style';
import { theme } from 'styles/theme';

export default function game() {
    const { slots } = useContext(Context);
    const [spotsColor, setSpotsColor] = useState([]);

    const nbRows = slots * 3;
    const [lineSelected, setLineSelected] = useState(nbRows - 1);
    const [lineState, setLineState] = useState([]);

    const [gameStatus, setGameStatus] = useState('playing');

    const colors = [
        theme.color.black,
        theme.color.red,
        theme.color.yellow,
        theme.color.green,
        theme.color.cyan,
        theme.color.orange,
        theme.color.purple,
        theme.color.pink,
        theme.color.grey,
        theme.color.white.spot
    ];

    const [selected, setSelected] = useState({ i: null, j: null });
    const [choosing, setChoosing] = useState(false);

    const setUp = () => {
        //colors
        const tmp = [];
        for (let i = 0; i < nbRows; i++) {
            tmp.push([]);
            for (let j = 0; j < slots; j++) {
                tmp[i].push(null);
            }
        }
        setSpotsColor(tmp);

        //lines state
        const temp = [];
        for (let i = 0; i < nbRows; i++) {
            temp.push([]);
            for (let j = 0; j < 3; j++) {
                temp[i].push(0);
            }
        }
        setLineState(temp);

        generateCode();
        setLineSelected(nbRows - 1);
        setGameStatus('playing');
    };

    useEffect(() => {
        setUp();
    }, []);

    const [code, setCode] = useState([]);

    const generateCode = () => {
        const tmp = [];
        for (let i = 0; i < slots; i++) {
            tmp.push(colors[Math.floor(Math.random() * colors.length)]);
        }
        setCode(tmp);
    };

    const colorize = (color: string) => {
        setChoosing(false);
        const tmp = [...spotsColor];
        tmp[selected.i][selected.j] = color;
        setSpotsColor(tmp);
        setSelected({ i: null, j: null });
    };

    const openColor = (i: number, j: number) => {
        setSelected({ i, j });
        setChoosing(lineSelected === i);
    };

    const verify = () => {
        const tmp = [...lineState];
        tmp[lineSelected] = [0, 0, 0];
        const alreadySeen = [];

        for (let j = 0; j < slots; j++) {
            if (spotsColor[lineSelected][j] === code[j]) {
                tmp[lineSelected][0]++;
                alreadySeen.push(j);
            } else {
                let found = false;
                for (let i = 0; i < slots && !found; i++) {
                    if (i !== j && !alreadySeen.includes(i)) {
                        if (spotsColor[lineSelected][j] === code[i]) {
                            if (spotsColor[lineSelected][i] !== code[i]) {
                                tmp[lineSelected][1]++;
                                found = true;
                            }

                            alreadySeen.push(i);
                        }
                    }
                }
                if (!found) {
                    tmp[lineSelected][2]++;
                }
            }
        }

        setLineState(tmp);
        if (tmp[lineSelected][0] === 4) {
            setGameStatus('success');
            setLineSelected(-1);
        } else if (lineSelected - 1 >= 0) {
            setLineSelected(() => lineSelected - 1);
        } else {
            setGameStatus('fail');
            setLineSelected(-1);
        }
    };

    const { t } = useTranslation();
    return (
        <DefaultLayout>
            <GameSection>
                <Board>
                    {(() => {
                        const rows = [];
                        rows.push(
                            <EndContainer key={-5}>
                                <EndText
                                    className={gameStatus === 'playing' ? 'displayed' : ''}
                                    color={theme.color.orange}>
                                    {t('playing')} : {lineSelected + 1}
                                </EndText>
                                <EndText
                                    className={gameStatus === 'success' ? 'displayed' : ''}
                                    color={theme.color.green}>
                                    {t('success')}
                                </EndText>
                                <EndText
                                    className={gameStatus === 'fail' ? 'displayed' : ''}
                                    color={theme.color.red}>
                                    {t('fail')}
                                </EndText>
                                {(() => {
                                    const array = [];
                                    for (let i = 0; i < slots; i++) {
                                        array.push(<Code key={i} color={code[i]}></Code>);
                                    }
                                    array.push(
                                        <PlayButton className={'selected'} onClick={() => setUp()}>
                                            {t('replay')}
                                        </PlayButton>
                                    );
                                    return (
                                        <CodeContainer
                                            className={gameStatus !== 'playing' ? 'displayed' : ''}>
                                            {array}
                                        </CodeContainer>
                                    );
                                })()}
                            </EndContainer>
                        );

                        for (let i = 0; i < nbRows; i++) {
                            const cols = [];
                            const InfosRow = [];
                            for (let j = 0; j < 3; j++) {
                                InfosRow.push(
                                    <InfosText key={j}>
                                        {lineState[i] ? lineState[i][j] : null}
                                    </InfosText>
                                );
                            }
                            cols.push(<Infos key={-1 - i}>{InfosRow}</Infos>);
                            for (let j = 0; j < slots; j++) {
                                cols.push(
                                    <Spot
                                        key={j}
                                        color={spotsColor[i] ? spotsColor[i][j] : 'none'}
                                        onClick={() => openColor(i, j)}
                                        className={
                                            i === selected.i &&
                                            j === selected.j &&
                                            lineSelected === i
                                                ? 'selected '
                                                : ''
                                        }></Spot>
                                );
                            }
                            cols.push(
                                <PlayButton
                                    key={slots + 1}
                                    className={lineSelected === i ? 'selected' : ''}
                                    onClick={() => verify()}>
                                    {t('verify_button')}
                                </PlayButton>
                            );
                            rows.push(
                                <Row className={lineSelected === i ? 'selected' : ''} key={i}>
                                    {cols}
                                </Row>
                            );
                        }
                        return rows;
                    })()}
                    <ColorContainer className={choosing ? 'open' : ''}>
                        {colors.map((color, i) => (
                            <ColorButton
                                key={i}
                                color={color}
                                onClick={() => colorize(color)}></ColorButton>
                        ))}
                    </ColorContainer>
                </Board>
            </GameSection>
        </DefaultLayout>
    );
}
