import React from 'react';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import { colors, styles } from '@themes';
import { Label } from '.';

const ImagesDropAndSelect = styled(Label)`
    padding: 2rem;
    border: 2px dashed ${colors.greyLight};  
    margin:0 auto;  
    display: flex;
    width:100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
    cursor: pointer;
    border-radius: ${styles.borderRadius};
    svg {
       
        margin-bottom: 1rem;
    }
`;

export default function ImageDropAndSelect({name,handleFileUpload,text, icon = "image", multiple}) {
    return (
        <>
             <ImagesDropAndSelect htmlFor="store-images">
                <FeatherIcon icon={icon} />
                {text}
            </ImagesDropAndSelect>
            <input name={name} accept="image/png, image/jpeg" onChange={handleFileUpload} type="file" id="store-images" style={{ display: 'none' }}  multiple={multiple}     />
        </>
    )
}
