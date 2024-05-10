import { db } from "@fire";
import { getDocs,getDoc, setDoc, doc,addDoc, updateDoc ,collection, query, where, deleteDoc} from "firebase/firestore";
import { storage } from "@fire";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const insertOne = async (collectionName, payload) => {
  try {
    const docRef = await setDoc(doc(db, collectionName, payload.uid), payload,{merge:true});
    return docRef;
  } catch (error) {
    console.log(error);
  }
};
export const updateOne = async (collectionName, payload) => {
  try {

    const docRef = await updateDoc(
      doc(db, collectionName, payload.uid),
      payload
    );
    return docRef;
  } catch (error) {}
};

export const updateServiceDoc = async (collectionName, payload) => {
  try {

    const docRef = await updateDoc(
      doc(db, collectionName, payload.id),
      payload
    );
    return docRef;
  } catch (error) {}
};


export const checkUser = async (collectionName, uid) => {
  try {
    const docRef = doc(db, collectionName, uid);
    const result = await getDoc(docRef);
    if (result.exists()) {
      return false;
    } else {
      return true;
    }
  } catch (err) {}
};
// get multiple documents in a collection
export const getData =async (collectioName,q=null)=>{
  const result=[];
  let res;
  try{
    const docRef= collection(db,collectioName)
    if(q)
    {
      res=await getDocs(q);
    }
    else{
      res=await getDocs(docRef);
    }
     
      res.forEach(item=>{
          result.push({id: item.id,...item.data()})
      })
     return result;
      
  }
  catch(error){
    console.log(error);
  }
}

// get single document with uid in a collection
export const getDocument = async (collectionName, uid) => {
  
  try {
    const docRef = doc(db, collectionName, uid);
   
    const result = await getDoc(docRef);
  

    return result.data();
  } catch (err) {
    console.log(err);
  }
};


export const getChats = async (collectionName,userDoc) => {
 let res=[];
 let q;
  try {
    if(userDoc.isSeller)
    {
       q = query(collection(db, collectionName), where("sellerID", "==", userDoc.uid));
    }
    else
    {
       q = query(collection(db, collectionName), where("userID", "==", userDoc.uid));
    }
   // q = query(collection(db, collectionName), where("chatID", "==", userDoc.uid));
    const qs=await getDocs(q);
    qs.forEach((doc=>{
      res.push({docID: doc.id,...doc.data()})
    }))
    return res;
  } catch (err) {
    console.log(err);
  }
};


export const uploadProfilePic = async (profile, id) => {
  try {
    const imagesRef = ref(storage, `/${id}/${Date.now()}${profile.name}`);
    const snapshot = await uploadBytes(imagesRef, profile);
    const result = await getDownloadURL(snapshot.ref);

    return result;
  } catch (err) {}
};
export const uploadDocument = async (id, file) => {
  try {
    const filename = Date.now().toString() + file.name;
    const imagesRef = ref(storage, `/${id}/${filename}`);
    const snapshot = await uploadBytes(imagesRef, file);
    const result = await getDownloadURL(snapshot.ref);
    const res={
      documentName:filename,
      documentURL:result
    }

    return res;
  } catch (err) {}
};


export const deleteDocument = async (documentname, id) => {
  try {
    const imagesRef = ref(storage, `/${id}/${documentname}`);
    const result = await deleteObject(imagesRef);
    //  const result = await getDownloadURL(snapshot.ref);
    return result;
  } catch (err) {}
};
export const uploadMultipleFiles = async (files, id,foldername) => {
  let result = [];
  try {

    for (var i = 0; i < files.length; i++) {
      const tempname=Date.now()+files[i].name;
  
      const imagesRef = ref(storage, `/${id}/${foldername}/${tempname}`);
      const snapshot = await uploadBytes(imagesRef, files[i]);
      const resURL = await getDownloadURL(snapshot.ref);
      const storeImage = { name: tempname, imageURL: resURL };
  
      result.push(storeImage);
    }

    return result;
  } catch (error) {

  }
};

export const deleteStoreDocument = async (id, name) => {
  try {
    const imagesRef = ref(storage, `/${id}/service-images/${name}`);
    const result = await deleteObject(imagesRef);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const addMsg = async (item,textMsg) =>{
  try{
    await addDoc(collection(db, "chats",item.roomId,'messages'), textMsg);
  }
  catch(err){
    console.log(err);
  }
  
}

export const addDocument = async (collectionName, payload) => {
  try{
    const docRef = await addDoc(collection(db, collectionName), payload);
  } catch(err){
    console.log(err);
  }
}

export const deleteFirestoreDocument = async (collectionName, id) => {
  try{
      await deleteDoc(doc(db,collectionName,id))
  } catch(err){
    console.log(err);
  }
  
}