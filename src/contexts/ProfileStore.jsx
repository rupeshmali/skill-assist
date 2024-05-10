import React, { createContext, useContext } from "react";
import {
  deleteDocument,
  updateOne,
  uploadDocument,
  uploadProfilePic,
  uploadMultipleFiles,
  deleteStoreDocument,
} from "@utils/dbUtils";
import { COLLECTION_NAME } from "@utils/constants";
import { AuthContext } from "./AuthStore";
import { message } from "antd";

export const ProfileStore = createContext();
export default function ProfileStoreProvider({ children }) {
  const { currentUser } = useContext(AuthContext)|| {};

  const handleUpdateUser = async (user) => {
    const result = await updateOne(COLLECTION_NAME.USERS, user);
    message.success(<strong>User updated successfully</strong>)
  };

  const handleProfilePic = async (id, profile) => {
    const result = await uploadProfilePic(profile, id);
    handleUpdateUser({ ...currentUser, photoURL: result });
  };

  const handleDocumentUpload = async (id, document) => {
    const result = await uploadDocument(id, document);
    handleUpdateUser({
      ...currentUser,
     document:{
       documentName:result.documentName,
       documentURL:result.documentURL
     },
     
    });
  };

  const createSellerRequest = async () => {

  }
  const handleDocumentDelete = async (id, documentname) => {
    const result = await deleteDocument(documentname, id);
    await handleUpdateUser({ ...currentUser, document:null});
  };

  const handleStoreDocumentDelete = async (id, name) => {
    const result = await deleteStoreDocument(id, name);
    let tempStoreImages = [];
    tempStoreImages = currentUser.storeImages;
    tempStoreImages.indexOf(id);
    tempStoreImages.splice(
      tempStoreImages.findIndex((e) => e.name === name),
      1
    );
    
    handleUpdateUser({
      ...currentUser,
      storeImages: [...tempStoreImages],
    });
  };

  const handleMultipleFileUpload = async (id, files,foldername) => {
    const result = await uploadMultipleFiles(files, id,foldername);
    const tempStoreImages = [...currentUser.storeImages, ...result];
    handleUpdateUser({ ...currentUser, storeImages: [...tempStoreImages]});
  };

  const values = {
    handleUpdateUser,
    handleProfilePic,
    handleDocumentUpload,
    handleDocumentDelete,
    handleMultipleFileUpload,
    handleStoreDocumentDelete,
    createSellerRequest
  };
  return (
    <ProfileStore.Provider value={values}>{children}</ProfileStore.Provider>
  );
}
