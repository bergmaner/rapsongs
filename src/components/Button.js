import styled from 'styled-components';

export const Button = styled.button`
padding: 8px 16px;
color: white;
background: #8080ff;
border-radius: 4px;
transition: all 0.6s;
white-space: nowrap;
outline:none;
border: none;
box-shadow: none;
${props => props.block ?  'display: block; width: 100%;' : ''}

    &:hover{
        background: #3333ff;
        cursor: pointer;
    }`;