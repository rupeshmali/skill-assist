import React from "react";
import styled from "styled-components";
import { Card, Container, Space, Title, BorderedCard } from "@components/custom";
import For from "@components/common/For";
import ServiceCard from "./ServiceCard";
import {useLocation} from 'react-router-dom'

const Services = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.4em;
  @media(max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
export default function Home({ home }) {
  const location=useLocation();
  return (
    <BorderedCard style={{ padding: "2em 0" }}>
    <Container style={{ paddingBottom: 50 }}>
      {
        location.state?.query ? <Title> Results for ' {location.state.query} ' </Title> :  <Title>Services</Title>
      }
     
      <Space top="2em" />
        <For
          Parent={Services}
          items={location.state?.services || home?.allServices || []}
          renderItem={(item) => (
            <ServiceCard item={item} />
          )}
        />
    </Container>
    </BorderedCard>
  );
}