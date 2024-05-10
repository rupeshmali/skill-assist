import { db } from '@fire';
import { COLLECTION_NAME } from '@utils/constants';
import { getData, getDocument } from '@utils/dbUtils';
import { collection, limit, query,where } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'

export const HomeStoreContext = createContext();
export default function HomeStoreProvider({ children }) {
    const [allSellers,setAllSellers]=useState(null);
    const [allServices,setAllSerivices]=useState(null);
    useEffect(()=>{
        const getAllSeller = async ()=>{
            const q = query(collection(db, COLLECTION_NAME.USERS), where("isSeller", "==", true));
            const res=await getData(COLLECTION_NAME.USERS,q);
            setAllSellers(res);
        }
        const getAllSerivces = async ()=>{
            const result=await getData(COLLECTION_NAME.SERVICES);
            setAllSerivices(result)
        }
        getAllSeller();
        getAllSerivces();
    },[])

    const getService =async(id) =>{
        const serv = await getDocument(COLLECTION_NAME.SERVICES,id);
        const sell= await getDocument(COLLECTION_NAME.USERS,serv.uid);
        return {serv,sell}
    }
    const values = {allSellers, allServices, getService}
    return (
        <HomeStoreContext.Provider value={values}>
            { children }            
        </HomeStoreContext.Provider>
    )
}
