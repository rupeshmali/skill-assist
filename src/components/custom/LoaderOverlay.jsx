import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Loader from "react-loader-spinner";
import { colors } from '@themes';
import logoVector from '@assets/logo-vector.svg';
const LoaderContainer = styled.div`
    height: 100vh;
    width: 100%;
    background-color: rgba(0,0,0,.02);
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    z-index: 10;
    backdrop-filter: blur(3px);
`;

const First = styled.rect`
    
`;
const Second = styled.rect`

`;
export default function LoaderOverlay() {
    return (
        <LoaderContainer>
            <svg width="100" height="100" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.rect transition={{ repeat: Infinity, duration: 1 }} initial={{ rotateX: 0 }} animate={{ rotateX: 360 }}  x="11" y="9" width="11" height="19" rx="1" fill="#0047FF" />
                <motion.rect transition={{ repeat: Infinity, duration: 1 }} initial={{ rotateX: 90 }} animate={{ rotateX: -360 }}  width="11" height="19" rx="1" fill="#5EA8FF" />
            </svg>

        </LoaderContainer>
    )
}
