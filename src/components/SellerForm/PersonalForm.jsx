import React from 'react'
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import { Form, message } from 'antd'
import { useHistory } from 'react-router-dom';
import { Button, Input, Space } from '@components/custom'
import { colors, fonts } from '@themes';
import routeConstants from '@utils/routeConstants';
import { ALLOWED_EXTENSIONS } from '@utils/constants';

const ProfilePic = styled.div`
  width: 150px;
  margin: 0 auto;
  border: 1px solid ${colors.grey};
  background-color: ${colors.background};
  height: 150px;
  border-radius: 50%;
  position: relative;
  margin-bottom: 1.5rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const EditLabel = styled.label`
  display: block;
  position: absolute;
  right: 0%;
  bottom: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50px;
  border: 2px solid ${colors.greyLight};
  background-color: ${colors.white};
  cursor: pointer;
  font-size: ${fonts.fontMedium};
`;

export default function PersonalForm({ personalForm, currentUser, handleProfilePic, setLoading, userUpdate }) {

  const handleUpload = async (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];
      const extension = file.type.split('/')[1];
      if(!ALLOWED_EXTENSIONS.includes(extension)) {
        throw new Error("File format not supported. Please upload .jpg, .png");
      }
      await handleProfilePic(currentUser.id, e.target.files[0]);
      setLoading(false);
    } catch(err) {
      setLoading(false);
      message.error(<strong>{err.message}</strong>)
    }
  };

  const handleSubmit = async (values) => {
    try {
      await userUpdate(values);
    } catch(err){
      message.error(<strong>{err.message}</strong>);
    }
  }
  return (
    <div>
      <Space top="2em" />
      <ProfilePic>
        <img alt="" src={currentUser.photoURL} />
        <EditLabel htmlFor="profile-edit">
          <FeatherIcon size="18" color="black" icon="edit-2" />
        </EditLabel>
        <input
          accept="image/png, image/jpeg"
          type="file"
          id="profile-edit"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
      </ProfilePic>
      <Space top="2rem" />
      <Form
        form={personalForm}
        requiredMark={false}
        layout='vertical'
        initialValues={{
          displayName: currentUser.displayName,
          email: currentUser.email,
          phoneNumber: currentUser.phoneNumber,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item

            label="Name"
            name="displayName"
          >
            <Input />
        </Form.Item>
        <Form.Item
            label="Email"
            name="email"
            disabled="true"
            
          >
            <Input disabled />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          >
          <Input />
        </Form.Item>
        <Button style={{ width: '100%' }} type="primary">Save</Button>
      </Form>
    </div>
  )
}

