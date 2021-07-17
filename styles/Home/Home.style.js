import styled from 'styled-components';

export const Section = styled.section`
    height: 100vh;
    width: 100vw;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Create = styled.article`
    padding: 20px;

    display: flex;
    flex-direction: column;
    row-gap: 20px;

    background: ${(props) => props.theme.color.white.bg};
    border-radius: 15px;
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`;

export const MenuTitle = styled.p`
    font-size: 20px;
`;

export const MenuWrapper = styled.div`
    display: flex;
    column-gap: 30px;
`;

export const MenuItem = styled.div`
    padding: 20px 30px;
    background: ${(props) => props.theme.color.cyan};
    border-radius: 10px;

    cursor: pointer;

    &.selected {
        border: 2px solid ${(props) => props.theme.color.black};
    }
`;

export const Button = styled.a`
    padding: 15px;
    border-radius: 360px;
    border: 2px solid ${(props) => props.theme.color.black};
    cursor: pointer;
    background: ${(props) => props.theme.color.green};
    align-self: flex-end;
`;
