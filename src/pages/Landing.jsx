import React from 'react'
import Component from '@components/Landing'
import { withContext } from '@components/hoc'
function Landing({user,home}) {
    return (
        <Component userAttr={user} home={home} />
    )
}
export default withContext(Landing)