import For from '@components/common/For';
import FeatherIcon from 'feather-icons-react';
import { BorderedCard, Button, Card, Container, FlexBetween, FlexCenter, FlexContainer, Space, Title } from '@components/custom';
import ServiceCard from '@components/Home/ServiceCard';
import { colors, fonts, styles } from '@themes';
import { Avatar, Divider, Image, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const ImageContainer = styled.img`
  width: 50px;
  cursor: pointer;
  height: 50px;
  border-radius: ${styles.borderRadius};
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
const Services = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.4em;
  @media(max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
const SellerHeader = styled(FlexBetween)`
 @media (max-width: 600px) {
    flex-direction: column;
    align-items: initial !important;
    justify-content: initial !important;
 }
`;
const SellerInfo = styled(FlexBetween)`
  @media (max-width: 600px) {
    margin-bottom: 1.5em;
    justify-content: initial !important;
    button {
      width: 100%;
    }
    h2 {
      font-size: ${fonts.fontLarge};
    }
  }
`;
const ImageDisplay = styled.div`
  max-width: 500px;
  margin: 20px auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${styles.borderRadius};
  }
`;
export default function Service({ home, user, chatStore, sellerStore }) {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentDisplayImage, setCurrentDisplayImage] = useState(service?.serviceImages[0]?.imageURL)
  const handleInitiateChat = async () => {
    setLoading(true);
    const roomId = await chatStore.initiateChat(seller);
    user.setDrawer(true);
    setLoading(false);
  }
  const saveService = async (item) => {
    setLoading(true);
    await sellerStore.handleSaveService(item);
    setLoading(false);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    const currentService = home?.allServices?.find(s => s.id === id)
    const currentSeller = home?.allSellers?.find(s => s.uid === currentService?.uid);
    setService(currentService);
    setSeller(currentSeller);
  }, [id]);
  return (
    <Card style={{ padding: '2em 0' }}>
      {seller && service && (
        <Container>
          <BorderedCard style={{ maxWidth: 700, margin: '0 auto' }}>
            <FlexBetween>
              <Title>
                {service.serviceName}
              </Title>
              {/* {loading ? (
                <Loader 
                  type='Oval'
                  height={20}
                  color={colors.text}
                  visible={loading}
                />
              ) : (<FeatherIcon style={{ cursor: 'pointer' }} icon="bookmark" fill={user.currentUser?.savedServices?.find(serv => serv.id === service.id) && colors.text} onClick={e => saveService(service)} />)} */}
            </FlexBetween> 
            <Space bottom=".4em" />
            <FlexContainer style={{ flexWrap: 'nowrap',width:"100%",overflowX:"scroll",padding:".3em " }}>
              {service.category.map(c => {
                return <Tag color={colors.primaryDark} style={{ borderRadius: 50 }}>
                  <strong>{c}</strong>
                </Tag>
              })}
            </FlexContainer>
            <Space bottom="1em" />
            <strong style={{ color: colors.text, whiteSpace: 'pre-wrap'  }}>
              {service.serviceDescription}
            </strong>
            <Space top="2em" />
            <ImageDisplay>
              <img src={currentDisplayImage || service.serviceImages[0].imageURL} alt="" />
              </ImageDisplay>
            {service.serviceImages.length > 1 && 
            <FlexCenter style={{ maxWidth: '700px', margin: '0 auto',flexWrap: 'wrap', gap: 10 }}>
              {service.serviceImages.map(image => {
                return (
                  <ImageContainer active={currentDisplayImage === image.imageURL} onClick={e => setCurrentDisplayImage(image.imageURL)} src={image.imageURL} alt="" />
                )
              })}
            </FlexCenter>}
            <Divider />
            <SellerHeader style={{ alignItems: 'center' }}>
              <SellerInfo>
                <Avatar src={seller.photoURL} size="large" style={{ marginRight: 20 }} />
                <div>
                  <strong style={{ fontSize: 18, display: 'block' }}>{seller.businessName}</strong>
                  <strong>{seller.address}</strong>
                </div>
              </SellerInfo>
             {
               service.uid!==user.currentUser.uid && 
              <Button disabled={loading} onClick={handleInitiateChat} type='primary'>Contact Seller</Button>  }
            </SellerHeader>
          </BorderedCard>
          {!!home?.allServices.filter(serv => serv.id !== service.id && serv.uid===seller.uid).length && <>
            <Divider />
            <Title>More to offer from {seller.businessName}</Title>
          <Space top="2em" />
          <For
            Parent={Services}
            items={home?.allServices.filter(serv => serv.id !== service.id && serv.uid===seller.uid) || []}
            renderItem={(item) => (
              <ServiceCard item={item} />
            )}
          />
          </>}
          <Divider />
            <Title>You might also like</Title>
          <Space top="2em" />
          <For
            Parent={Services}
            items={home?.allServices.filter(serv => serv.id !== service.id) || []}
            renderItem={(item) => (
              <ServiceCard item={item} />
            )}
          />
        </Container>
      )}
    </Card>
  )
}

