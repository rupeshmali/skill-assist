import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import styled from "styled-components";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Badge, Dropdown, Menu,Drawer } from "antd";
import { Container, FlexBetween, Button, Space, Overlay, FlexCenter } from "@components/custom";
import logo from "@assets/logo.svg";
import { colors, fonts, styles } from "@themes";
import If from "./If";
import { profileOptions, STOREDETAILS } from "@utils/constants";
import For from "./For";
import routeConstants from "@utils/routeConstants";
import MessageDrawer from "./MessageDrawer";
import AuthOverlay from "@components/Landing/AuthOverlay";
import Avatar from "antd/lib/avatar/avatar";
import { useLocation } from "react-router-dom";

const NavContainer = styled.div`
  background-color: ${colors.white};
  box-shadow: ${styles.boxShadow};
  padding: 1rem 0;
`;
const Logo = styled(NavLink)``;

const Links = styled.div``;

const ProfileThumbnail = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50px;
  border: 2px solid ${colors.greyLight};
`;
const LetterThumbnail = styled(FlexCenter)`
  height: 3rem;
  width: 3rem;
  background-color: ${colors.primaryLight};
  color:${colors.primaryDark};
  font-size: ${fonts.fontLarge};
  border-radius: 50px;
  font-weight: ${fonts.weight.bold};
 
`;
export const CustomMenu = styled(Menu)`
  && {
    min-width: 14rem;
    border-radius: ${styles.borderRadius};
    padding: 0.3rem;
  }
`;
export const Option = styled(Menu.Item)`
  && {
    display: grid;
    grid-template-columns: 30px 1fr;
    padding: 0.8rem 1rem;
    align-items: center;
    border-radius: ${styles.borderRadius};
    color: ${colors.text};
    &:hover {
      background-color: ${colors.primaryLight};
      color: ${colors.primaryDark};
    }
  }
`;
const MessageTrigger = styled.div`
  cursor: pointer;
`;
export default function Navbar({ user: userProps }) {
  const history = useHistory();
  const [showAuth, setShowAuth] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const authGaurd = query.get('authgaurd');
  const { currentUser,user, signIn, logout, setDrawer, drawer } = userProps || {};
  const newProfileOptions=profileOptions.map(item=>{
    if(currentUser?.isSeller)
    {
      if(item.path.includes(routeConstants.sellerForm.route))
      {
        item.name='Dashboard'
        item.path=`/seller-dashboard?key=1`
      }
    }
    return item;
  })

  useEffect(() => {
    if(authGaurd && !user) setShowAuth(true)
  }, [authGaurd])
  const ProfileMenu = (
    <For
      Parent={(props) => <CustomMenu {...props} />}
      items={newProfileOptions}
      renderItem={(item, key) => {
        return (
          <Option
            onClick={(e) => {
              item.danger ? logout() : history.push(item.path);
            }}
            key={key}
            danger={item.danger}
          >
            <strong>{item.name}</strong>
          </Option>
        );
      }}
    />
  );

  return (
    <NavContainer>
      <Container>
        <FlexBetween>
          <Logo to="/landing">
            <img width="180" src={logo} alt="logo" />
          </Logo>
          <Links>
            <If
              condition={user}
              otherwise={
               <>
                <Button onClick={e => setShowAuth(true)} type="primary" style={{ padding: '.6em 1.3em' }}>
                     Signup
                </Button>
               </>
              }
            >
              <FlexBetween>
                <MessageTrigger onClick={e => setDrawer(true)}>
                  <Badge
                    style={{ backgroundColor: colors.primaryDark }}
                  >
                    <FeatherIcon icon="message-square" />
                  </Badge>
                </MessageTrigger>
                <Space right="2rem" />
                <Dropdown overlay={ProfileMenu} trigger={["click"]}>
                  <FlexBetween style={{ cursor: "pointer" }}>
                   {
                     currentUser?.photoURL ? (<ProfileThumbnail src={currentUser?.photoURL} />):(< LetterThumbnail >{currentUser?.displayName?.split('')[0]} </LetterThumbnail>)
                   } 
                    <Space right=".5rem" />
                    <FeatherIcon icon="chevron-down" color={colors.text} />
                  </FlexBetween>
                </Dropdown>
              </FlexBetween>
            </If>
          </Links>
        </FlexBetween>
      </Container>
      {showAuth && <AuthOverlay userProps={userProps} setShowAuth={setShowAuth} />}
      <MessageDrawer setDrawer={setDrawer} currentUser={currentUser} user={user} drawer={drawer}  />
      {drawer && <Overlay onClick={e => setDrawer(false)} />}
    </NavContainer>
  );
}
