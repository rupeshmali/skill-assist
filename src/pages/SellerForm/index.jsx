import React from 'react'
import { withContext } from '@components/hoc'
import withGaurd from '@components/hoc/withGaurd';
import Component from '@components/SellerForm'



function SellerForm({user,profile}) {
    return (
       <Component user={user} profile={profile}/>
    )
}


const ProtectedComponent = withContext(SellerForm);
export default withGaurd(ProtectedComponent);
