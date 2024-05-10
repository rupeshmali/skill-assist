import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Avatar } from "antd";
import FeatherIcon from "feather-icons-react";
import styled from "styled-components";
import { colors, fonts, styles } from "@themes";
import {
  UserOutlined
} from "@ant-design/icons";
import { ChatStore } from "@contexts/ChatStore";
import { FlexBetween, FlexContainer, Title, Input, Overlay } from "@components/custom";
import For from "./For";

const CustomDrawer = styled.div`
  overflow-y: scroll;
  border-radius: ${styles.borderRadius};
  height: 100%;
  position: fixed;
  box-shadow: -10px 10px 10px rgba(0,0,0,.07);
  top: 0;
  right: -400px;
  background-color: white;
  width: 100%;
  max-width: 400px;
  z-index: 1000;
  transition: right .2s;
`;


const ProfileCover = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  margin: 0 0 0 10px;
  border-radius: 50%;
  background-color: ${colors.white};
`;

// new
const ChatListContainer = styled.div`
  height: 100%;
  padding: 1em;
  background-color: ${colors.secondary};
`;
const ChatListItem = styled.div`
  margin: 1em 0;
  padding: 1em;
  cursor: pointer;
  display: grid;
  grid-template-columns: 60px 1fr;
  box-shadow: ${styles.boxShadow};
  border-radius: ${styles.borderRadius};
  background-color: ${colors.white};
`;

const ChatListHeader = styled(FlexBetween)`
  padding: 1.2em;
  background-color: ${colors.white};
  .close-container {
    cursor: pointer;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${styles.borderRadius};
    border: 2px solid transparent;
    transition: border .2s;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: ${colors.secondary};
  position: relative;
`;

const Button = styled.button`
  height: 40px;
  cursor: pointer;
  outline: none;
  border-radius: ${styles.borderRadius};
  border: none;
  width: 45px;
  background-color: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InputContainer = styled(FlexBetween)`
  padding: 1.3em;
  form {
    width: 100%;
  }
  grid-template-columns: 1fr 50px;
  gap: 10px;
`;
const ChatBody = styled.div`
  height: 100%;
  padding: 1em;
  overflow-y: scroll;
`;
const Message = styled.div`
    //padding: .3em .6em;
  //  margin: .2em 0;
    display: flex;
    flex-direction: column;
    align-items: ${props => props.you ? 'flex-start' : 'flex-end'};
`;
const ChatMessage = styled.div`
    box-shadow: ${styles.boxShadow};
    word-wrap: break-word;
    padding: .7em .8em;
    font-weight: ${fonts.weight.bold};
    font-size: ${fonts.fontMedium};
    background-color: ${props => !props.you ? colors.white : colors.primary};
    max-width: 250px;
    border-radius: ${styles.borderRadius};
    color: ${props => !props.you ? colors.text : colors.white};
`;
const Time = styled.div`
    margin-top: 7px;
    font-size: ${fonts.fontSmall};
    margin-bottom: .3em;
    font-weight: ${fonts.weight.bold};
    color: ${colors.grey};
`;
export default function MessageDrawer({
  currentUser,
  user,
  drawer,
  setDrawer
}) {
  const {
    getMessages,
    chatMessages,
    addMsg,
    chats,
    setChatMessages
  } = useContext(ChatStore);
  const [showChat, setShowChat] = useState(false);
  const [messageForm] = Form.useForm();
  const [chatItem, setChatItem] = useState();
  const ref = useRef(null);
  const inputRef = useRef(null);
  const handleSend = async () => {
    const { message } = messageForm.getFieldValue();
    const messageData = {
      message,
      sentAt: Date.now(),
      sender: currentUser.uid
    }
    messageForm.resetFields();
    await addMsg(chatItem, messageData);
    inputRef.current.focus();
  };
  useEffect(() => {
    if (!drawer || !showChat) {
      setChatMessages([]);
      setChatItem(null);
      setShowChat(false);
      messageForm.resetFields();
    }
  }, [drawer, showChat])
  const ChatList = () => {
    return (
      currentUser &&
      <>
        <ChatListHeader>
          <Title>
            Recent Chats
          </Title>
          <div className="close-container"
            onClick={_ => {
              setDrawer(false);
            }}
          >
            <FeatherIcon icon='x' size='20' />
          </div>
        </ChatListHeader>
        <For
          items={chats || []}
          Parent={ChatListContainer}
          renderItem={(chat => {
            const notYourId = chat.uids.filter(uid => uid !== currentUser.uid);
            const { displayName, businessName, photoURL } = chat[notYourId];
            return (
              <ChatListItem
                onClick={() => {
                  const item = { ...chat[notYourId], roomId: chat.uid };
                  setChatItem(item);
                  setShowChat(true);
                  getMessages(item);
                }}
                style={{ alignItems: "center" }}>
                <Avatar src={photoURL} style={{ marginRight: 10 }} size="large" />
                <div>
                  <strong style={{ fontSize: '1.1em' }}>{businessName || displayName}</strong><br />
                  <small style={{ fontWeight: 'medium' }}>Show last message here.</small>
                </div>
              </ChatListItem>
            )
          })}
        />
      </>
    );
  };
  useEffect(() => {
    if(ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [chatMessages])
  const ChatBox = () => {
    return (
      <ChatContainer>
        <ChatListHeader>
          <FlexContainer style={{ alignItems: 'center' }}>
            <FeatherIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowChat(false);
              }}
              icon="arrow-left"
              size={20}
            />
            <ProfileCover>
              {chatItem.photoURL ? (
                <Avatar src={chatItem.photoURL} />)
                :
                (<UserOutlined
                  size={25}
                  style={{ fontSize: "20px", color: `${colors.primary}` }}
                />)}
            </ProfileCover>
            <strong>{chatItem.businessName || chatItem.displayName}</strong>
          </FlexContainer>
        </ChatListHeader>
        <For 
          Parent={(props) => {
            return <ChatBody ref={ref} {...props}>
              {props.children}
            </ChatBody>
          }}
          items={chatMessages || []}
          renderItem={chat => (
            <Message you={chat.sender !== currentUser.uid}>
              <ChatMessage you={chat.sender === currentUser.uid}>
                {chat.message}
              </ChatMessage>
              <Time>{chat.sentAt}</Time>
            </Message>
          )}
        />
        <InputContainer>
          <Form form={messageForm} onFinish={handleSend}>
            <Form.Item name="message" style={{ margin: 0, padding: 0 }}>
              <Input autoComplete="off" ref={inputRef} type="text" placeholder="Type your message here..." />
            </Form.Item>
          </Form>
          <Button type="primary" onClick={handleSend}>
            <FeatherIcon size="18" icon="chevron-right" color={colors.white} />
          </Button>
        </InputContainer>
      </ChatContainer>
    );
  };
  return (
    <CustomDrawer style={{ right: drawer ? '0' : '-400px'}}>
      {!showChat ? <ChatList /> : <ChatBox />}
    </CustomDrawer>
  );
}
