import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    align-self: center;
    margin: 0 auto;
    margin-top: 5em;
    height: 25em;
`;

export const FormInput = styled.input`
    border: none;
    padding-left: 1em;
    height: 2em;
    font-size: 1em;
    width: 70%;
`;

export const FormSubmit = styled.button`
    width: 50%;
    height: 3em;
    border-radius: 50px;
    font-size: 1em;

    &:hover{
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
        transition: box-shadow 0.2s ease-in-out;
    }
`;

export const FormText = styled.p`
    color: black;
    font-size: 0.8em;
    margin-top: 1.5em;
`;

export const FormLabel = styled.label`
    width: 50%;
    border: 1px solid black;
    border-radius: 50px;
    height: 3em;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 1.5em;
    margin-bottom: 3em;
`;