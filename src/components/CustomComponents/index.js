import styled from "styled-components";
import img from './background.png';

// FORM COMPONENTS

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    align-self: center;
    margin: 0 auto;
`;

export const FormInput = styled.input`
    border: none;
    padding-left: 1em;
    height: 1.5em;
    font-size: 1.5em;
    width: 70%;
    font-family: 'Saira Stencil One', cursive;
    background-color: #b5b5b5;
`;

export const FormSubmit = styled.button`
    width: 50%;
    height: 1.5em;
    border-radius: 50px;
    font-size: 1.5em;
    font-weight: bold;
    background-color: #b5b5b5;
    border: 1px solid #016b18;
    color: #016b18;

    &:hover{
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
        transition: box-shadow 0.2s ease-in-out;
    }
`;

export const FormText = styled.p`
    color: black;
    font-size: 1em;
    margin-top: 1.5em;
    font-family: 'Saira Stencil One', cursive;
    -webkit-text-stroke: 0.2px grey;
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
    background-color: #b5b5b5;
    border: 1px solid #016b18;
`;

export const FormHeader = styled.h1`
    color: black;
    font-family: 'Saira Stencil One', cursive;
    font-size: 3.5em;
    color: #016b18;
    -webkit-text-stroke: 0.2px #053616;
`;

export const FormBackground = styled.div`
    width: 50%;
    max-height: 70vh;
    margin-top: 5em;
    padding-top: 2em;
`;

export const Background = styled.div`
    border: 1px solid black;
    background-image: url(${img});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -moz-box-shadow: 10px 20px 80px 10px black inset, -10px -20px 80px 10px black inset;
	-webkit-box-shadow: 10px 20px 80px 10px black inset, -10px -20px 80px 10px black inset;
    box-shadow: 10px 20px 80px 10px black inset, -10px -20px 80px 10px black inset;
    display: flex;
    justify-content: center;

    @media (min-width: 600px){
        min-width: 100vw;
        max-width: 1080px;
        height: 100vh;
        -moz-box-shadow: 60px 20px 45px 10px black inset, -60px -20px 45px 10px black inset;
	    -webkit-box-shadow: 60px 20px 45px 10px black inset, -60px -20px 45px 10px black inset;
        box-shadow: 60px 20px 45px 10px black inset, -60px -20px 45px 10px black inset;
    }

    @media (min-width: 1000px){
        min-width: 1000px;
        max-width: 1080px;
        -moz-box-shadow: 120px 15px 75px 10px black inset, -150px -20px 75px 10px black inset;
	    -webkit-box-shadow: 120px 15px 75px 10px black inset, -150px -20px 75px 10px black inset;
        box-shadow: 120px 15px 75px 10px black inset, -150px -20px 75px 10px black inset;
    }
`;

export const Body = styled.div`
    background-color: black;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: auto;
`;

