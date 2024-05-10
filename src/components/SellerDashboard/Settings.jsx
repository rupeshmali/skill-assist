import { colors, fonts, styles } from '@themes';
import React from 'react'
import styled from 'styled-components'

export const Upcoming = styled.div`
    padding: 1em;
    border-radius: ${styles.borderRadius};
    background-color: ${colors.primaryLight};
    color: ${colors.primaryDark};
    font-weight: ${fonts.weight.bold};
`;
export default function Settings() {
    return (
        <Upcoming>
            Feature will be available soon
        </Upcoming>
    )
}
