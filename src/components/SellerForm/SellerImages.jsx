import React from 'react'
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import { Button, Space } from '@components/custom'
import ImageDropAndSelect from '@components/custom/ImageDropAndSelect'
import { colors, fonts, styles } from '@themes';
import For from '@components/common/For';
import { FOLDERS } from '@utils/constants';

const Document = styled.div`
  position: relative;
  border-radius: ${styles.borderRadius};
  overflow: hidden;
  button {
    position: absolute;
    cursor: pointer;
    top: 20px;
    right: 20px;
    z-index: 2;
    border-radius: ${styles.borderRadius};
    background-color: ${colors.dangerLight};
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    font-weight: bold;
    color: ${colors.dangerDark};
  }
  span {
    top: 20px;
    left: 20px;
    position: absolute;
    padding: 10px 15px;
    background-color: rgba(0,0,0,0.2);
    border-radius: ${styles.borderRadius};
    user-select: none;
    color: ${colors.white};
    font-weight: ${fonts.weight.bold};
    backdrop-filter: blur(4px);
  }
`;

export default function SellerImages({
  setLoading,
  currentUser,
  handleDocumentUpload,
  handleDocumentDelete,
  handleSellerRequestCreation,
  isBecomeASellerDisabled
 }) {
  const handleVerificationDocumentUpload = async (e) => {
    try {
      setLoading(true)
      const file = e.target.files[0];
      await handleDocumentUpload(currentUser.uid, file);
      setLoading(false);
    } catch(err) {
      setLoading(false)
      console.log({err});
    }
  }
  const handleDelete = async (uid, documentName) => {
    try {
      setLoading(true)
      await handleDocumentDelete(uid, documentName);
      setLoading(false);
    }
    catch(err) {
      console.log({ err });
    }
  }
  return (
    <div>
        {!currentUser.document ? (
          <ImageDropAndSelect handleFileUpload={handleVerificationDocumentUpload} name="document" text={`Upload Aadhar/Pan Card`} />) : 
          (
            <Document>
              <img src={currentUser.document.documentURL} style={{ width: '100%', height: '100%', }} alt="" />
              <button onClick={() => handleDelete(currentUser.uid, currentUser.document.documentName)}>
                <FeatherIcon size="15" icon="trash-2" />
              </button>
              <span>Document</span>
            </Document>
          )
        }
        <Space top="2em" />
        <Button disabled={isBecomeASellerDisabled()} onClick={handleSellerRequestCreation} style={{ width: '100%' }} type='primary'>
          Become A Seller          
        </Button>
    </div>
  )
}
