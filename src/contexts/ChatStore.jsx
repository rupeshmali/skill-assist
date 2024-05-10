import React, { useState, createContext, useContext, useEffect } from 'react'
import { addMsg as addMsgFn, getChats, insertOne } from '@utils/dbUtils';
import { createRoomId, getTime } from '@utils';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '@fire';
import { AuthContext } from './AuthStore';
import { COLLECTION_NAME } from '@utils/constants';

export const ChatStore = createContext();
export default function ChatStoreProvider({ children }) {
  const [chatMessages, setChatMessages] = useState();
  const [chats, setChats] = useState();
  const { currentUser } = useContext(AuthContext);

  const initiateChat = async (item) => {
    try {
      const roomId = await createRoomId(item.uid, currentUser.uid);
      const userOne = currentUser.uid;
      const userTwo = item.uid;
      const payload = {
        [userOne]: currentUser,
        [userTwo]: { ...item },
        uids: [currentUser.uid, item.uid],
        uid: roomId
      }
      await insertOne(COLLECTION_NAME.CHATS, payload);
      return roomId;
    } catch (err) {
      console.log(err);
    }
  }
  const getMessages = async (chatItem) => {
    const q = query(collection(db, "chats", chatItem?.roomId, "messages"), orderBy("sentAt", 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newres = [];
      querySnapshot.forEach((doc) => {
        newres.push(doc.data());
      });
      const tempres = [];
      newres.forEach((data) => {
        let time = getTime(data.sentAt);
        const item = {
          message: data.message,
          sentAt: time,
          sender: data.sender,
        };

        tempres.push(item);
      });
      setChatMessages(tempres);
    });
  };


  const addMsg = async (chatItem, msgData) => {
    const res = await addMsgFn(chatItem, msgData)
  }

  const getChatList = async () => {
    const q = query(collection(db, COLLECTION_NAME.CHATS), where("uids", "array-contains", currentUser.uid))
    onSnapshot(q, snapshot => {
      const temp = []
      snapshot.forEach(snap => {
          temp.push({...snap.data(), id: snap.id});
      });
      setChats(temp);
    })
  };

  useEffect(() => {
    getChatList();
  }, []);

  const values = {
    getChatList,
    getMessages,
    chatMessages,
    addMsg,
    chats,
    initiateChat,
    setChatMessages
  };
  return (
    <ChatStore.Provider value={values}>{children}</ChatStore.Provider>

  )
}
