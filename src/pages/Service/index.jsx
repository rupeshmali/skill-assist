import React from 'react'
import { withContext } from '@components/hoc';
import withGaurd from '@components/hoc/withGaurd';
import Component from '@components/Service'
function Service({ home, user, chatStore, seller }) {
    return (
        <Component home={home} user={user} chatStore={chatStore} sellerStore={seller} />
    )
}

const ProtectedComponent = withContext(Service);
export default withGaurd(ProtectedComponent);