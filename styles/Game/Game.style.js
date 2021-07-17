import styled from 'styled-components';

export const GameSection = styled.section`
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const EndContainer = styled.article`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const EndText = styled.p.attrs((props) => {})`
    display: none;

    color: ${(props) => props.color};
    font-size: 40px;

    &.displayed {
        display: block;
    }
`;

export const CodeContainer = styled.div`
    margin-bottom: 20px;

    visibility: hidden;
    display: flex;
    align-items: center;
    column-gap: 20px;

    &.displayed {
        visibility: visible;
    }
`;

export const Code = styled.div`
    padding: 20px;
    background: ${(props) => (props.color ? props.color : props.theme.color.background)};
    border-radius: 360px;
`;

export const Infos = styled.div`
    display: flex;
    column-gap: 20px;
`;

export const InfosText = styled.p`
    font-size: 20px;
    &:first-of-type {
        color: ${(props) => props.theme.color.green};
    }

    &:nth-child(2) {
        color: ${(props) => props.theme.color.orange};
    }

    &:last-of-type {
        color: ${(props) => props.theme.color.red};
    }
`;

export const PlayButton = styled.button`
    padding: 5px 15px;

    color: ${(props) => props.theme.color.green};
    background: none;
    border: 2px solid ${(props) => props.theme.color.green};
    border-radius: 10px;

    visibility: hidden;
    cursor: pointer;

    &.selected {
        visibility: visible;
    }

    &:hover {
        background: ${(props) => props.theme.color.green};
        color: ${(props) => props.theme.color.blue};
    }
`;

export const Board = styled.article`
    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;

    background: ${(props) => props.theme.color.blue};
    border-radius: 15px;

    position: relative;
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    column-gap: 20px;

    &.selected {
        > div {
            cursor: pointer;
        }
    }
`;
export const Spot = styled.div.attrs((props) => {})`
    padding: 20px;
    background: ${(props) => (props.color ? props.color : props.theme.color.background)};
    border-radius: 360px;

    cursor: not-allowed;

    &.selected {
        border: 2px dotted #f00;
    }
`;

export const ColorContainer = styled.div`
    padding: 15px;

    display: none;
    grid-template-columns: repeat(3, fit-content(100%));
    column-gap: 20px;
    row-gap: 20px;

    background: ${(props) => props.theme.color.background};
    border: 3px solid #000;

    position: absolute;

    &.open {
        display: grid;
    }
`;

export const ColorButton = styled.button.attrs((props) => {})`
    padding: 20px;
    background: ${(props) => (props.color ? props.color : props.theme.color.background)};
    border: 2px solid #000;
    border-radius: 10px;

    cursor: pointer;

    &:last-of-type {
        grid-column: 2;
    }
`;
