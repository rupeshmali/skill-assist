import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Dropdown, Form, Menu, Tabs } from "antd";
import {
  Button,
  Card,
  Container,
  Field,
  FlexBetween,
  FlexCenter,
  FlexContainer,
  Space,
  Text,
  Title,
} from "@components/custom";

import landing from "@assets/landing.svg";
import GoogleIcon from "@assets/googleIcon.svg";
import FeatherIcon from "feather-icons-react";
import { colors, fonts, styles } from "@themes";
import { Input } from "@components/custom";
import { useHistory } from "react-router-dom";
import ServiceCard from "@components/Home/ServiceCard";
import For from "@components/common/For";
import routeConstants from "@utils/routeConstants";
import { useLocation } from "react-router-dom";
const { TabPane } = Tabs;

const Left = styled.div`
  flex: 1;
`;
const Right = styled.div`
  flex: 1;
  @media (max-width: 900px) {
    margin-bottom: 3em;
  }
`;
const Hero = styled(FlexBetween)`
  position: relative;
  min-height: 500px;
  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    align-items: stretch;
  }
  img {
    width: 100%;
  }
  button {
    strong {
      font-size: 1em;
    }
  }
`;

const Heading = styled(Title)`
  span {
    color: ${colors.primary};
  }
  @media (max-width: 500px) {
    font-size: 2em !important;
  }
`;
const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 50px;
  gap: 0.8em;
  background-color: ${colors.white};
  position: absolute;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  left: 50%;
  bottom: 0;
  border: 2px solid ${colors.greyLight};
  transform: translateX(-50%) translateY(50%);
  box-shadow: ${styles.boxShadow};
  border-radius: ${styles.borderRadius};
  overflow: none;
  @media (max-width: 500px) {
    font-size: 0.9em;
  }
  input {
    padding: 1em 1.5em;
    border: none;
    outline: none;
    min-width: 200px;
    border-right: 1px solid ${colors.greyLight};
  }
  strong {
    min-width: 50px;
    color: #777;
  }
  button {
    margin: 5px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.primary};
    color: ${colors.white};
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: ${styles.borderRadius};
  }
`;

const SearchedServiceCard = styled(ServiceCard)`
    

    
`;
const ServiceContainer = styled.div`
  position:absolute;
  width:100%;
 
 overflow-x: none;

  max-width:680px;
  max-height:30vh;
  bottom:-25%;
  left:50%;
  transform:translateX(-50%)translateY(50%);
  background-color: ${colors.white};
  border: 1px solid ${colors.greyLight};
  box-shadow: ${styles.boxShadow};
  border-radius: ${styles.borderRadius};
  
  
`;
const OuterContainer = styled.div`
  background-color: ${colors.white};
  border-top: 2px solid ${colors.greyLight};
  padding-top: 2em;
  @media (max-width: 500px) {
    padding-top: 5em;
  }
`;

const CustomMenu = styled(Menu)`
  && {
    min-width: 14rem;
    border-radius: ${styles.borderRadius};
    padding: 0.3rem;
  }
`;
const Option = styled(Menu.Item)`
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
const HowItWorks = styled.div`
  height: 60vh;
`;
export default function Landing({ userAttr, home }) {

  const [searchedServices, setSearchedServces] = useState(null);
  const [loginForm] = Form.useForm();
  const [query, setQuery] = useState("");
  const [serviceDialog, setServiceDialog] = useState(false);
  const [signupForm] = Form.useForm();
  const history = useHistory();
  const [selected, setSelected] = useState("Nashik");
  const showServices = async () => {
    history.push({
      pathname: routeConstants.home.route,
      state: {
        services: searchedServices,
        query: query
      }
    })
  };
  const handleSearch = (e) => {

    setQuery(e.target.value)
    setServiceDialog(true);
    let tempSearch = [];
    home?.allServices.filter(service => {
      if (service.serviceName.toLowerCase().includes(e.target.value.toLowerCase())) {
        tempSearch.push(service)
      }
    }
    )
    console.log(tempSearch);
    setSearchedServces(tempSearch);

    if (e.target.value === '' || tempSearch.length === 0) {
      console.log("inside if ");

      setServiceDialog(false);
    }
  }
  const cityOverlay = (
    <CustomMenu>
      <Option onClick={() => setSelected("Mumbai")}>
        <strong>Mumbai</strong>
      </Option>
      <Option onClick={() => setSelected("Nashik")}>
        <strong>Nashik</strong>
      </Option>
      <Option onClick={() => setSelected("Pune")}>
        <strong>Pune</strong>
      </Option>
    </CustomMenu>
  );

  return (
    <>
      <OuterContainer>
        <Container>
          <Hero>
            <Left>
              <Heading style={{ fontSize: "4em", textTransform: "capitalize" }}>
                Find <span>services</span> you need in your{" "}
                <span>locality</span>
              </Heading>
              <Space top="2em" />
              <Button
                type="primary"
                style={{ padding: "1em 2em" }}
                onClick={(e) => history.push("/")}
              >
                <FlexBetween>
                  <Title style={{ fontSize: "1.3em" }} color={colors.white}>
                    Browse Services
                  </Title>
                  <FeatherIcon
                    style={{ marginLeft: 20, stokeWidth: 3 }}
                    icon="arrow-right"
                  />
                </FlexBetween>
              </Button>
            </Left>
            <Space top="4em" />
            <Right>
              <img width="90%" src={landing} />
            </Right>
            <div>
              <SearchContainer>
                <input
                  type="search"
                  placeholder="Search for services, sellers "
                  onChange={handleSearch}
                />
                <Dropdown overlay={cityOverlay} trigger={["click"]}>
                  <FlexBetween style={{ cursor: "pointer" }}>
                    <strong
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {selected}
                    </strong>
                    <FeatherIcon icon="chevron-down" color={colors.grey} />
                  </FlexBetween>
                </Dropdown>
                <button
                  onClick={showServices}
                  className="button"
                  type="primary"
                >
                  <FeatherIcon size="20" icon="search" />
                </button>
              </SearchContainer>
              {serviceDialog && (
                <ServiceContainer >
                  <For
                    Parent={ServiceContainer}
                    items={searchedServices || []}
                    renderItem={(item) => (
                      <SearchedServiceCard item={item} />
                    )}
                  />
                </ServiceContainer>
              )}
            </div>
          </Hero>
        </Container>
      </OuterContainer>
      <Container>
        <HowItWorks></HowItWorks>
      </Container>
    </>
  );
}

{
  /* <Container>
<Space top="1rem" />
<Hero height="600px" gap="20">
  <Left>
    <Title color={colors.primary} size="fontXL">
      Find services you need in your locality
    </Title>
    <Space top="2em" />
    <Button type="primary">Get Started</Button>
  </Left>
  <Space top="2em" />
  <Right>
    <Card>
      {userAttr.currentUser ? (
        <>
          <Title size="fontLarge" color={colors.text}>
            Search services near you
          </Title>
          <Space top="2em" />
          <Field>
            <label>Name of the Service</label>
            <Input disabled type="text" placeholder="Eg. Baker" />
          </Field>
          <Space top="2em" />
          <Field>
            <label>Location</label>
            <Select>
              <Option>Mumbai</Option>
              <Option>Pune</Option>
              <Option>Nashik</Option>
            </Select>
          </Field>
        </>
      ) : (
          <>
        <Tabs defaultActiveKey="1">
          <TabPane tab={<strong>Login</strong>} key="1">
            <Form
              requiredMark={false}
              name="login"
              form={loginForm}
              onFinish={handleLogin}
              onFinishFailed={handleLoginFailed}
              layout="vertical"
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input disabled type="password" />
              </Form.Item>

              <Space top="2em" />
              <Button disabled style={{ width: "100%" }} type="primary">
                Login
              </Button>

            </Form>
          </TabPane>
          <TabPane tab={<strong>Signup</strong>} key="2">
            <Form
              requiredMark={false}
              form={signupForm}
              onFinish={handleSingup}
              onFinishFailed={handleSingupFailed}
              name="signup"
              layout="vertical"
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input  disabled />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input disabled type="password" />
              </Form.Item>

              <Space top="2em" />
              <Button
              disabled
                style={{ width: "100%" }}
                type="primary"
                onClick={handleSingup}
              >
                Signup
              </Button>


            </Form>
          </TabPane>
        </Tabs>
        <Space top="1.3em" />
        <Button
        onClick={userAttr.signIn}
        style={{
          width: "100%",
          backgroundColor: `${colors.white}`,
          border: `1px solid ${colors.grey}`,
        }}
      >
        <FlexCenter>
          <img
            style={{ height: "1.2rem", width: "1.2rem" }}
            src={GoogleIcon}
          />
          <Text style={{ marginLeft: "1rem" }}>Google</Text>
        </FlexCenter>
      </Button>
      </>
      )}
    </Card>
  </Right>
</Hero>
</Container> */
}
