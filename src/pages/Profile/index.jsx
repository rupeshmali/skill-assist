import React from 'react'
import Component from '@components/Profile'
import { withContext } from '@components/hoc'
import withGaurd from '@components/hoc/withGaurd';
function Profile({user, profile}) {
    return (
       <Component user={user} profile={profile} />
    )
}

const ProtectedComponent = withContext(Profile);
export default withGaurd(ProtectedComponent);
