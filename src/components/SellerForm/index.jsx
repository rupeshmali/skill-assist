import React, { useEffect, useState } from 'react'
import { Form, message, Tabs } from 'antd'
import { useHistory, useLocation } from 'react-router-dom';
import LoaderOverlay from '@components/custom/LoaderOverlay';
import { COLLECTION_NAME } from '@utils/constants';
import { insertOne } from '@utils/dbUtils';
import routeConstants from '@utils/routeConstants';
import { Card, Container, Space } from '@components/custom'
import PersonalForm from './PersonalForm';
import ProfessionalForm from './ProfessionalForm';
import SellerImages from './SellerImages';

const { TabPane } = Tabs;
export default function SellerForm({ user: userAttr, profile }) {
  const [loading, setLoading] = useState(false);
  const query = new URLSearchParams(useLocation().search)
  const step = query.get('step')
  const history = useHistory();
  const [personalForm] = Form.useForm();
  const [professionalForm] = Form.useForm();
  // userUpdate
  const isBecomeASellerDisabled = () => {
    const { displayName, email, phoneNumber, businessName, photoURL, address, description, document } = userAttr.currentUser;
    if(!displayName || !email || !phoneNumber || !businessName || !photoURL || !address || !description || !document) {
      return true
    }
    return false;
  }
  const userUpdate = async (payload, stopPropogation) => {
    if(Object.values(payload).some(item => !item)) {
      throw new Error("Please fill all fields");
    }
    setLoading(true);
    const userToUpdate = { ...payload, uid: userAttr.currentUser.uid }
    await profile.handleUpdateUser(userToUpdate);
    if(stopPropogation) return;
    if(step === "1") {
      history.replace(`${routeConstants.sellerForm.route}?step=2`)
    } else if(step === "2") {
      history.replace(`${routeConstants.sellerForm.route}?step=3`)
    } else {
    }
    setLoading(false)
  }

  const handleSellerRequestCreation = async () => {
    try {
      const { displayName, email, phoneNumber, businessName, photoURL, address, description, document } = userAttr.currentUser;
      if(!displayName || !email || !phoneNumber || !businessName || !photoURL || !address || !description || !document) {
        throw new Error("Please fill all fields");
      }
      setLoading(true)
      await insertOne(COLLECTION_NAME.SELLER_REQUESTS, {
        uid: userAttr.currentUser.uid,
        email: userAttr.currentUser.email,
        isVerified: false,
      });
      setLoading(false);
      message.success(<strong>Seller Request Created Successfully</strong>);
      history.replace('/')
    } catch(err) {
      message.error(<strong>{err.message}</strong>)
    }
  }
  useEffect(() => {
  }, [])
  return (
    <Container>
      <Space top="2em" />
      {loading && <LoaderOverlay />}
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
          <Tabs onChange={key => history.replace(`${routeConstants.sellerForm.route}?step=${key}`)} activeKey={step} defaultActiveKey={step} centered>
            <TabPane tab={<strong>Personal Details</strong>} key={1}>
              <PersonalForm userUpdate={userUpdate} setLoading={setLoading} handleProfilePic={profile.handleProfilePic} currentUser={userAttr.currentUser} personalForm={personalForm} />
            </TabPane>
            <TabPane tab={<strong>Professional Details</strong>} key={2}>
              <ProfessionalForm
                professionalForm={professionalForm}
                userUpdate={userUpdate}
                setLoading={setLoading}
                currentUser={userAttr.currentUser}
              />
            </TabPane>
            <TabPane tab={<strong>Upload Identification</strong>} key={3}>
              <SellerImages
                setLoading={setLoading}
                currentUser={userAttr.currentUser}
                handleDocumentUpload={profile.handleDocumentUpload}
                handleDocumentDelete={profile.handleDocumentDelete}
                handleMultipleFileUpload={profile.handleMultipleFileUpload}
                handleSellerRequestCreation={handleSellerRequestCreation}
                isBecomeASellerDisabled={isBecomeASellerDisabled}
              />
            </TabPane>
          </Tabs>
        </Card>
      <Space style={{ marginBottom: 100 }} />
    </Container>
  )
}
