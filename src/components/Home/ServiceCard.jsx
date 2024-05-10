import { Button, Title } from '@components/custom';
import { colors, styles } from '@themes';
import React from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const Service = styled.div`
  overflow: hidden;
  border-radius: ${styles.borderRadius};
  border: 1px solid ${colors.greyLight};
  background-color: ${colors.white};
  height: 100%;
  display: grid;
  grid-template-columns: 200px 1fr;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
  .card-img {
    padding: 10px;
    width: 100%;
    border-right: 1px solid ${colors.greyLight};
    height: 200px;
    img {
      border-radius: ${styles.borderRadius};
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }
  .card-body {
    padding: 1em;
    display: flex;
    height: 200px;
    flex-direction: column;
    justify-content: space-between;
    strong:first-child {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;  
      overflow: hidden;
    }
    strong {
        margin-top: 10px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
    }
  }
`;
export default function ServiceCard({ item }) {
  const history = useHistory();
  const showDetails = async (item) => {
    history.push(`/service/${item.id}`)
  }
  return (
    <Service>
      <div className="card-img">
        <img src={item.serviceImages[0]?.imageURL} alt="" />
      </div>
      <div className="card-body">
        <div>
          <strong style={{ fontSize: '1.2em' }} title={item.serviceName}>
            {item.serviceName}
          </strong>
          <strong title={item.serviceDescription} style={{ color: '#999' }}>
            {/* {item.serviceDescription.length > 50 ? item.serviceDescription.substring(0, 80) + '...' : item.serviceDescription} */}
            {item.serviceDescription}
          </strong>
        </div>
        <Button onClick={e => showDetails(item)} type="primary" style={{ width: '100%', marginTop: 20 }}>
          More Details
        </Button>
      </div>
    </Service>
  )
}
