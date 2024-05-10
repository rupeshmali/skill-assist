import React from 'react'
import { withContext } from '@components/hoc'
import withGaurd from '@components/hoc/withGaurd';
import Component from '@components/SellerDashboard'
import { Container } from '@components/custom';



function SellerDashboard({user,profile, seller}) {
    return (
       <Container>
           <Component seller={seller} user={user} categories={user.categories} profile={profile}/>
       </Container>
    )
}
const ProtectedComponent = withContext(SellerDashboard);
export default withGaurd(ProtectedComponent);
