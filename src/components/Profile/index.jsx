import { colors, fonts, styles } from "@themes";
import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  Field,
  Button,
  Space,
  Text,
  Bold,
  Container
} from "@components/custom";
import Input from "@components/custom/Input";
import FeatherIcon from "feather-icons-react";
import { ALLOWED_EXTENSIONS, ERROR_MESSAGES } from "@utils/constants";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import LoaderOverlay from "@components/custom/LoaderOverlay";
const Wrapper = styled(Container)`
  padding: 0 2rem;
  margin-top: 2rem;
`;
const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  height: 100vh;
  max-width: 1200px;
  gap: 1em;
  margin: 0 auto;
  align-items: flex-start;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    place-items: center;
  }
`;
const ProfileCard = styled(Card)`
  position: relative;
  overflow: hidden;
  width: 100%;
  &:before {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    left: 8px;
    height: 100px;
    border-radius: ${styles.borderRadius};
    background-color: ${colors.primaryDark};
}
`;
const EditProfile = styled(Card)`
  p {
    font-size: 2rem;
  }
  @media (max-width: 800px) {
    max-width: 400px;
    width: 100%;
    min-width: 300px;
    margin: 0 auto;
  }
`;
const ProfilePic = styled.div`
  width: 150px;
  border:2px solid ${colors.white};
  margin: 0 auto;
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
const UserInfo = styled.div`
  text-align: center;
  p {
    margin: 0 auto;
    font-size: 1.4em;
    font-weight: ${fonts.fontMedium};
    color: ${colors.text};
  }
  strong {
    color: ${colors.primary};
  }
`;


const LeftPanel = styled.div`
  @media (max-width: 800px) {
    max-width: 400px;
    width: 100%;
    min-width: 300px;
    margin: 0 auto;
  }
`;

const Block = styled.div`
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${styles.borderRadius};
  background-color: ${colors.primaryLight};
  font-weight: bold;
  color: ${colors.primaryDark};
  cursor: pointer;
  user-select: none;
`;
export default function Profile({ user: userAttr, profile }) {
  const { currentUser } = userAttr;
  const { handleUpdateUser, handleProfilePic } = profile;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    uid: currentUser?.id,
    email: currentUser?.email,
    displayName: currentUser?.displayName,
    phoneNumber: currentUser?.phoneNumber,
    photoURL: currentUser?.photoURL,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    const { displayName, phoneNo } = form;
    try {
      if (!displayName) {
        throw new Error("Name is required");
      }
      setLoading(true);
      await handleUpdateUser(form);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error(<strong>{err.message}</strong>)
    }
  };
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
  return (
    <Wrapper>
      {loading && <LoaderOverlay />}
      <MainContainer>
        <LeftPanel>
          <ProfileCard>
            <ProfilePic>
              <img alt="" src={currentUser?.photoURL} />
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
            <UserInfo>
              <Text><b>{currentUser.displayName}</b></Text>
              <Bold>{currentUser.email}</Bold>
            </UserInfo>
            {!currentUser.isSeller && (
              <>
                <Space top="2em" />
                <Block onClick={() => history.push('/become-a-seller?step=1')}>
                  Want to become a seller?
                  <FeatherIcon icon="chevron-right" size="20" />
                </Block>
              </>
            )}
          </ProfileCard>
        </LeftPanel>
        <EditProfile>
          <p><strong>Edit profile</strong></p>
          <Field>
            <label>Name</label>
            <Input
              name="displayName"
              type="text"
              defaultValue={form.displayName}
              onChange={handleChange}
              placeholder="Eg. Harvey Specter"
              width="100"
            />
          </Field>
          <Field>
            <label>Email</label>
            <Input
              disabled={true}
              name="email"
              type="email"
              defaultValue={form.email}
              onChange={handleChange}
              placeholder="Eg. example@mail.com"
              width="100"
            />
          </Field>
          <Field>
            <label>Phone</label>
            <Input
              name="phoneNumber"
              type="number"
              min="0"
              defaultValue={form.phoneNumber}
              placeholder="Eg. 77982xxxx1"
              width="100"
              onChange={handleChange}
            />
          </Field>
          <Space top="2em" />
          <Button disabled={loading} style={{ width: '100%' }} type="primary" onClick={handleSubmit}>
            Save Profile
          </Button>
        </EditProfile>
      </MainContainer>
    </Wrapper>
  );
}
