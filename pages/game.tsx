import Context from 'components/context/context';
import { useContext, useEffect, useState } from 'react';
import {
    Board,
    ColorButton,
    ColorContainer,
    GameSection,
    Infos,
    InfosContainer,
    InfosText,
    PlayButton,
    PlayContainer,
    Row,
    Spot
} from 'styles/Game/Game.style';
import { theme } from 'styles/theme';

export default function game() {
    const { slots } = useContext(Context);
    const [spotsColor, setSpotsColor] = useState([]);
    const [lineSelected, setLineSelected] = useState(9);
    const [lineState, setLineState] = useState([]);

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

    const nbRows = 10;

    useEffect(() => {
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
    }, []);

    const [code, setCode] = useState([]);
    const generateCode = () => {
        const tmp = [];
        for (let i = 0; i < slots; i++) {
            tmp.push(colors[Math.floor(Math.random() * colors.length)]);
        }
        setCode(tmp);
        console.log(tmp);
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
                    console.log(alreadySeen);
                    if (i !== j && !alreadySeen.includes(i)) {
                        if (spotsColor[lineSelected][j] === code[i]) {
                            tmp[lineSelected][1]++;
                            found = true;
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
    };

    return (
        <GameSection>
            {/* <InfosContainer>
                {(() => {
                    const rows = [];
                    for (let i = 0; i < nbRows; i++) {
                        const cols = [];
                        for (let j = 0; j < 3; j++) {
                            cols.push(<p key={j}>{lineState[i] ? lineState[i][j] : null}</p>);
                        }
                        rows.push(<Infos key={i}>{cols}</Infos>);
                    }
                    return rows;
                })()}
            </InfosContainer> */}
            <Board>
                {(() => {
                    const rows = [];

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
                                        i === selected.i && j === selected.j && lineSelected === i
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
                                Verify
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
    );
}