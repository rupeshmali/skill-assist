import { COLLECTION_NAME } from "@utils/constants";
import { deleteFirestoreDocument, updateOne, updateServiceDoc } from "@utils/dbUtils";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthStore";
import { db } from "@fire";

export const SellerStoreContext = createContext();
export default function SellerStoreProvider({ children }) {
  const [seller, setSeller] = useState({});
  const [services, setServices] = useState(null);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    let unsub;
    async function getServices() {
      const q = query(
        collection(db, COLLECTION_NAME.SERVICES),
        where("uid", "==", currentUser.uid)
      );
      unsub = onSnapshot(q, (snapshot) => {
        let temp = [];
        snapshot.forEach((doc) => {
          temp = [...temp, { ...doc.data(), id: doc.id }];
        });

        setServices(temp);
      });
    }
    getServices();
    return () => unsub && unsub();
  }, []);
  const handleSaveService = (item) => {
    const savedServices = currentUser?.savedServices ? [...currentUser.savedServices] : [];
    const isServicePresent = savedServices.find(service => service.id === item.id);
    let payload = {};
    if(isServicePresent) {
      const newSaved = savedServices.filter(service => service.id !== item.id);
      payload = { ...currentUser, savedServices: [...newSaved]};
    } else {
      payload = { ...currentUser, savedServices: [...savedServices, item]};
    }
    updateOne(COLLECTION_NAME.USERS, payload);
  }
  const editService = async (serviceId, payload) => {
    await updateServiceDoc(COLLECTION_NAME.SERVICES, payload);
  };

  const handleServiceDelete = async (deleteItem) => {

    await deleteFirestoreDocument(
      COLLECTION_NAME.SERVICES,
      deleteItem.id
    );
  };
  const values = { seller, editService, services, handleServiceDelete, handleSaveService };
  return (
    <SellerStoreContext.Provider value={values}>
      {children}
    </SellerStoreContext.Provider>
  );
}
