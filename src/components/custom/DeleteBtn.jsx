import React from 'react'
import { Button } from '.';
export default function DeleteBtn(props) {
    const { type = "primary", text} = props;
    return (
        <Button {...props} type={type}>
            {text}
        </Button>
    )
}