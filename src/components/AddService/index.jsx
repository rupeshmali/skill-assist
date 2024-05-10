import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors, styles } from "@themes";
import { useParams, useHistory } from "react-router-dom";
import ReactSelect from 'react-select';
import { Button, Number, Input, Space, Title, TextArea } from "@components/custom";
import { Form, Image, Divider, message } from "antd";
import ImageDropAndSelect from "@components/custom/ImageDropAndSelect";
import { COLLECTION_NAME, FOLDERS } from "@utils/constants";
import routeConstants from "@utils/routeConstants";
import {
  addDocument,
  uploadMultipleFiles
} from "@utils/dbUtils";
import { getID } from "@utils/token";
const Container = styled.div`
  max-width: 900px;
  box-shadow: ${styles.boxShadow};
  border-radius: ${styles.borderRadius};
  background-color: ${colors.white};
  padding: 2rem;
  margin: 2rem auto;
`;

export default function AddService({ categories, seller }) {
  const history = useHistory();
  const [selected, setSelected] = useState([]);
  const { userId: uid } = useParams();
  const [service, setService] = useState({
    serviceName: "",
    serviceDescription: "",
    statecategories: [],
    productImages: [],
  });
  const [urls, setUrls] = useState([]);
  const onFinish = async (values) => {
    const { serviceName, serviceDescription, minimum, maximum } = values;
    try {
      if (!serviceName || !serviceDescription) {
        throw new Error("Please fill all fields");
      }
      if (maximum < minimum) {
        throw new Error("Maximum price should be more than minimum price");
      }
      if (maximum && !minimum) {
        throw new Error("Minimum price range required if maximum provided");
      }
      if (!selected.length) {
        throw new Error("Please select atleast one category");
      }
      if (!urls.length) {
        throw new Error("Please upload service images");
      }
      const payload = { ...values, serviceImages: [...urls], uid,category:selected.map(s=> s.value) }
      await addDocument(COLLECTION_NAME.SERVICES, payload);
      history.push(`${routeConstants.sellerDashboard.route}?key=2`)
      message.success(<strong>Service created</strong>)
    } catch (err) {
      message.error(<strong>{err.message}</strong>)
    }
  };

  const onFinishFailed = (errorInfo) => {

  };

  const handleChange = (e) => {
    if (e.target.name === "categoryselect") {
      setService({ ...service, category: selected });
    }
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleMultipleDocumentUpload = async (files) => {
    const res = await uploadMultipleFiles(files, uid, FOLDERS.SERVICE_IMAGES);
    setUrls([...urls, ...res]);
  }
  useEffect(() => {
    const id = getID();

  }, [])
  return (
    <Container>
      <Title>Add Service</Title>
      <Divider />
      <Form
        requiredMark={false}
        name="basic"
        layout="vertical"
        initialValues={{ require: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Service Name"
          name="serviceName"
        >
          <Input type="text" placeholder="Eg. Cake Baker" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="serviceDescription"
        >
          <TextArea
            type="text"
            placeholder="Short Description about your offering"
            rows={4}
          />
        </Form.Item>
        <div>
          <label htmlFor="categories">
            Select Categories
          </label>
          <Space top=".5em" />
          <ReactSelect
            onChange={e => setSelected(e)}
            isMulti
            name="categories"
            options={categories.map(category => {
              return {
                value: category.name,
                label: category.name
              }
            })}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <Space top="1.5em" />
        <Form.Item
          label="Minimum Price Range"
          type="number"
          name="minimum"
        >
          <Number placeholder="Range 0 - Rs.10000 " min={0} max={10000} />
        </Form.Item>
        <Form.Item
          label="Maximum Price Range"
          type="number"
          name="maximum"
        >
          <Number placeholder="Range 1 - Rs.10000" min={1} max={10000} />
        </Form.Item>
        {urls.map(item => {
          return <Image src={item.imageURL} />
        })}
        <ImageDropAndSelect
          multiple
          name="storeimage"
          handleFileUpload={e => handleMultipleDocumentUpload(e.target.files)}
          text="Upload Service Images"
          handleImage
        />
        <Space top="1em" />
        <strong style={{ color: colors.grey }}>
          Image size should be less than 500 KB
        </strong>
        <Space top="2em" />
        <Button style={{ width: "100%" }} type="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
