import React from "react";
import styled from "styled-components";
import { Card, Tabs } from "antd";
import { useMediaQuery } from 'react-responsive'
import { useHistory, useLocation } from "react-router";
import { colors, fonts, styles } from "@themes";
import Storedetails from "./Storedetails";
import Services from "./Services";
import Theme from "./Theme";
import Share from "./Share";
import Settings from "./Settings";
import routeConstants from "@utils/routeConstants";
import { Space } from "@components/custom";

const { TabPane } = Tabs;

const Dashboard = styled(Card)`
  padding:1rem ;
  border-radius: ${styles.borderRadius};
  padding: 0.3rem;
  background-color: ${colors.white};
  box-shadow: ${styles.boxShadow};
`;
export default function SellerDashboard({user,categories, seller}) {
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' })
  const query = new URLSearchParams(useLocation().search);
  const key = query.get('key')
  return (
    <>
    <Space top="2em" />
      <Dashboard>
        <Tabs size={isTabletOrMobile ? 'middle': 'large'} tabPosition={isTabletOrMobile ? 'top': 'left'} onChange={e => history.replace(`${routeConstants.sellerDashboard.route}?key=${e}`)} activeKey={key} defaultActiveKey={key} centered>
          <TabPane tab={<strong>Store Details</strong>} key={1}>
            <Storedetails currentUser={user.currentUser}  />
          </TabPane>
          <TabPane tab={<strong>Services</strong>} key={2}>
            <Services seller={seller} currentUser={user.currentUser} categories={user.categories} />
          </TabPane>
          <TabPane tab={<strong>Theme</strong>} key={3}>
            <Theme />
          </TabPane>
          <TabPane tab={<strong>Share</strong>} key={4}>
            <Share />
          </TabPane>
          <TabPane tab={<strong>Settings</strong>} key={5}>
            <Settings />
          </TabPane>
        </Tabs>
      </Dashboard>
      </>
  );
}
// {key === STOREDETAILS && }
// {key === SERVICES && }
// {key === THEME && }
// {key === SHARE && < />}
// {key === SETTINGS && <Settings />}