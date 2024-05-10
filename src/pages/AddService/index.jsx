import React from 'react'
import Component from '@components/AddService'
import { withContext } from '@components/hoc';
import withGaurd from '@components/hoc/withGaurd';
function AddService({ user,seller }) {
    return (
        <>
            <Component categories={user.categories} seller={seller} />
        </>
    )
}

const ProtectedComponent = withContext(AddService);
export default withGaurd(ProtectedComponent);