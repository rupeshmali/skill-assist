import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors, fonts, styles } from "@themes";
import FeatherIcon from "feather-icons-react";
import { useHistory } from "react-router";
import { Tag, Form, Modal, Select, Image, message, Divider, Dropdown } from "antd";
import ReactSelect from 'react-select';
import {
  Card,
  Container,
  Space,
  FlexContainer,
  Input,
  Button,
  Title,
  BorderedCard,
  Overlay,
  FlexBetween,
  Number,
  TextArea,
} from "@components/custom";
import DeleteBtn from "@components/custom/DeleteBtn";
import routeConstants from "@utils/routeConstants";
import { DeleteOutlined } from "@ant-design/icons";

import For from "@components/common/For";
import ServiceCard from "@components/Home/ServiceCard";
import { CustomMenu } from "@components/common/Navbar";
import ImageDropAndSelect from "@components/custom/ImageDropAndSelect";
import { addDocument, uploadMultipleFiles } from "@utils/dbUtils";
import { COLLECTION_NAME, FOLDERS } from "@utils/constants";
const { confirm } = Modal;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Document = styled.div`
  position: relative;
  border-radius: ${styles.borderRadius};
  overflow: hidden;
  button {
    position: absolute;
    cursor: pointer;
    top: 20px;
    right: 20px;
    z-index: 2;
    border-radius: ${styles.borderRadius};
    background-color: ${colors.dangerLight};
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    font-weight: bold;
    color: ${colors.dangerDark};
  }
  span {
    top: 20px;
    left: 20px;
    position: absolute;
    padding: 10px 15px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: ${styles.borderRadius};
    user-select: none;
    color: ${colors.white};
    font-weight: ${fonts.weight.bold};
    backdrop-filter: blur(4px);
  }
  ;`
const CustomTag = styled.div`
  margin: 0 0.4rem;
  display: flex;
  background-color: ${colors.primary};
  border-radius: ${styles.borderRadius};
  width: fit-content;
  color: ${colors.white};
  padding: 5px;
  align-items: center;
  justify-content: center;
`;
const AddButton = styled.div`
  display: flex;
  padding: 0.5rem 1rem;

  align-items: center;
  text-align: center;
  justify-content: baseline;
  background-color: ${colors.primary};
  color: ${colors.white};
  border-radius: ${styles.borderRadius};
  &:hover {
    cursor: pointer;
  }
`;
const DocumentContainer = styled.div`
  width: 100%;
  position: relative;
  &:hover {
    button {
      opacity: 1;
    }
  }
  button {
    position: absolute;
    opacity: 0;
    top: 1rem;
    right: 1rem;
    z-index: 2;
    padding: 0.5rem;
    transition: all 0.2s;
  }
`;

const CustomCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 10px;
`;

const CustomCard = styled(BorderedCard)`
  padding: 10px;
  .card-img {
    height: 130px;
    width: 100%;
    position: relative;
    img {
      border-radius: ${styles.borderRadius};
      width: 100%;
      height: 100%;
    }
    button {
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 10px;
    z-index: 2;
    border-radius: ${styles.borderRadius};
    background-color: ${colors.dangerLight};
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    font-weight: bold;
    color: ${colors.dangerDark};
  }
  span {
    cursor: pointer;
    top: 10px;
    left: 10px;
    position: absolute;
    padding: 8px 15px;
    background-color: rgba(0,0,0,0.2);
    border-radius: ${styles.borderRadius};
    user-select: none;
    color: ${colors.white};
    font-weight: ${fonts.weight.bold};
    backdrop-filter: blur(4px);
  }
  }
  .card-body {
    strong:first-child {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;  
      overflow: hidden;
    }
    strong.description {
      text-align: justify;
      font-size: ${fonts.fontSmall};
      margin-top: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;  
      overflow: hidden;
    }
  }
`;

export default function Services({
  currentUser,
  categories,
  seller: sellerStore,
}) {
  let deletedCategories = [];
  const {
    seller,
    editService: updateService,
    services,
    handleServiceDelete,
  } = sellerStore;
  const [form] = Form.useForm();
  const [editService, setEditService] = useState();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [remainingCateogries, setReaminingCategories] = useState(null);
  const [deleteItem, setDeleteItem] = useState();
  const [updatedService, setUpdateServices] = useState();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [selected, setSelected] = useState([]);
  const handleDeleteModal = (item) => {
    setDeleteModal(false);
  };

  const handleEdit = (item) => {
    setEditService(item);
    form.setFieldsValue({
      serviceName: item.serviceName,
      serviceDescription: item.serviceDescription,
      maximum: item.maximum,
      minimum: item.minimum,
    });
    setSelected(item.category.map(cat => ({ value: cat, label: cat })));
    setUrls(item.serviceImages);
    let tempCategories = [...categories];
    if (item.category.length > 0) {
      setReaminingCategories(tempCategories.filter(ct => !item.category.includes(ct.name)));
    }
    setEditModal(true);
  };

  useEffect(() => {
  }, [categories]);
  const handleShare = async (item) => {
    navigator.clipboard.writeText(
      `http://localhost:3000/seller-dashboard?key=services/${item.id}`
    );
    const data = await navigator.clipboard.readText();

    message.success("Link Copied");
  };

  useEffect(() => {
    editModal ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'scroll'
  }, [editModal])

  const handleDelete = async (item) => {
    await handleServiceDelete(deleteItem);
  };
  const showDeleteModal = (item) => {
    setDeleteItem(item);
    setDeleteModal(true);
  };
  const history = useHistory();

  const handleClick = () => {
    history.push(
      routeConstants.addService.route.replace(":userId", currentUser?.uid)
    );
  };

  const handleTag = (tag) => {
    deletedCategories.push(tag);
  };
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
      setLoading(true)
      const payload = { ...values, id: editService.id, serviceImages: [...urls], uid: currentUser.uid,category:selected.map(s=> s.value)}
      await updateService(editService.id, payload);
      message.success(<strong>Service Updated</strong>)
      setLoading(true)
      setEditService(null);
      setLoading(false)
      setEditModal(false);
    } catch (err) {
      setLoading(false)
      message.error(<strong>{err.message}</strong>)
    }
  };
  const handleMultipleDocumentUpload = async (files) => {
    setImageUploading(true)
    const res = await uploadMultipleFiles(files, currentUser.uid, FOLDERS.SERVICE_IMAGES);
    setUrls([...urls, ...res]);
    setImageUploading(false)
  }


  const DeleteModalComponent = () => {
    return (
      <Modal
        title="Edit Service"
        visible={deleteModal}
        onOk={handleDelete}
        okText="Delete"
        okType="danger"
        onCancel={handleDeleteModal}
      >
        <label>Delete Sevice?</label>
      </Modal>
    );
  };
  return (
    <Container>
      <ButtonContainer>
        <Title>Services</Title>
        <Button
          onClick={handleClick}
          type="primary"
        >
          Add Service
        </Button>
      </ButtonContainer>
      <Divider />
      <CustomCardContainer>
        {services &&
          services.map((item) => {
            return (
              <CustomCard>
                <div className="card-img">
                  <button onClick={() => showDeleteModal(item)}>
                    <FeatherIcon size="15" icon="trash-2" />
                  </button>
                  <span onClick={e => handleEdit(item)}>Edit</span>
                  <img src={item?.serviceImages[0].imageURL} alt="" />
                </div>
                <Space top="1em" />
                <div className="card-body">
                  <Title size="fontMedium">
                    {item.serviceName}
                  </Title>
                  <strong className="description">
                    {item.serviceDescription}
                  </strong>
                </div>
              </CustomCard>
            );
          })}
      </CustomCardContainer>
      {editModal && <Overlay>
        <Card style={{ width: '100%', maxWidth: 500, height: '90vh', overflowX: "scroll" }}>
          <FlexBetween>
            <Title>Add Service</Title>
            <FeatherIcon onClick={e => setEditModal(false)} style={{ cursor: 'pointer' }} icon='x' />
          </FlexBetween>
          <Divider />
          <Form
            requiredMark={false}
            name="basic"
            form={form}
            layout="vertical"
            initialValues={{ require: true }}
            onFinish={onFinish}
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
              <TextArea rows={4} placeholder="Short Description about your offering. [more than 30 characters]" />
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
                value={selected}
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

            <ImageDropAndSelect
              multiple
              name="storeimage"
              icon={imageUploading ? 'loader' : 'image'}
              handleFileUpload={e => handleMultipleDocumentUpload(e.target.files)}
              text={imageUploading ? 'Uploading Image' : 'Upload Service Images'}
              handleImage
            />
            <Space top="1em" />
            <FlexContainer style={{ gap: 10 }}>
              {urls.map(item => {
                return <img width={70} height={70} style={{ borderRadius: styles.borderRadius }} src={item.imageURL} />
              })}
            </FlexContainer>
            <Space top="2em" />
            <Button disabled={loading} style={{ width: "100%" }} type="primary">
              Submit
            </Button>
          </Form>
        </Card>
      </Overlay>}
      {/* <EditModalCompoenet /> */}
      <DeleteModalComponent />
    </Container>
  );
}

 // const EditModalCompoenet = ({ }) => {
  //   const [form] = Form.useForm();
  //   const closeModal = () => setEditModal(false);

  //   const handleEditModal = async () => {
  //     if (deletedCategories.length > 0) {
  //       deletedCategories.forEach((item) => {
  //         let index = editService.category.indexOf(item);
  //         editService.category.splice(index, 1);
  //       });
  //     }
  //     await updateService(editService.id, form.getFieldValue());
  //     setEditModal(false);
  //     setReaminingCategories(null);
  //   };
  //   return (
  //     <Modal
  //       title="Edit Service"
  //       visible={editModal}
  //       onOk={handleEditModal}
  //       onCancel={closeModal}
  //     >
  //       <Form
  //         requiredMark={false}
  //         form={form}
  //         name="basic"
  //         layout="vertical"
  //         autoComplete="off"
  //         initialValues={{
  //           serviceName: editService?.serviceName,
  //           serviceDescription: editService?.serviceDescription,
  //         }}
  //       >
  //         <Form.Item
  //           name="serviceName"
  //           label="Service Name"
  //           rules={[{ required: true, message: "Please enter service name!!" }]}
  //         >
  //           <Input />
  //         </Form.Item>
  //         <Form.Item
  //           name="serviceDescription"
  //           label="Description"
  //           rules={[
  //             {
  //               required: true,
  //               message:
  //                 "Please enter a description describing your service/product",
  //             },
  //           ]}
  //         >
  //           <Input />
  //         </Form.Item>
  //         <Form.Item name="existingCategories">
  //           <FlexContainer>
  //             {editService?.category.map((ct) => {
  //               return (
  //                 <Tag
  //                   key={ct}
  //                   color={colors.primary}
  //                   closable
  //                   onClose={() => handleTag(ct)}
  //                 >
  //                   {ct}
  //                 </Tag>
  //               );
  //             })}
  //           </FlexContainer>
  //         </Form.Item>
  //         <Space bottom="1rem" />
  //         <Form.Item name="newCategories" label="Add More categories">
  //           <For
  //             Parent={(props) => (
  //               <Select allowClear mode="multiple" {...props} />
  //             )}
  //             items={remainingCateogries}
  //             renderItem={(item) => {
  //               return (
  //                 <Option key={item.id} value={item.name}>
  //                   {item.name}
  //                 </Option>
  //               );
  //             }}
  //           />
  //         </Form.Item>
  //         <Form.Item label="Service Images">
  //           {editService?.serviceImages?.map((item) => {
  //             return (
  //               <DocumentContainer>
  //                 <DeleteBtn
  //                   text={<DeleteOutlined size="20" />}
  //                   type="danger"
  //                 // onClick={handleImageDelete}
  //                 />
  //                 <Image
  //                   style={{ height: "6rem", width: "6rem" }}
  //                   src={item.imageURL}
  //                   style={{ width: "100%", height: "100%" }}
  //                   alt=""
  //                 />
  //                 <button
  //                   onClick={(e) => {
  //                     handleServiceImageDelete(item);
  //                   }}
  //                 >
  //                   <FeatherIcon size="15" icon="trash-2" />
  //                 </button>
  //                 <span>{item.name}</span>
  //               </DocumentContainer>
  //             );
  //           })}
  //         </Form.Item>
  //       </Form>
  //     </Modal>
  //   );
  // };