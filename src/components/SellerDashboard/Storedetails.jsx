import React, { useContext, useState } from "react";
import Input from "@components/custom/Input";
import {
  Container, TextArea, Title
} from "@components/custom";
import { Button } from "@components/custom";
import { Divider, Form } from "antd";
import { ProfileStore } from "@contexts/ProfileStore";

export default function Storedetails({ currentUser }) {
  const { handleUpdateUser } = useContext(ProfileStore);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); 
  const onFinish = async (values) => {
    setLoading(true)
    await handleUpdateUser({...values, uid: currentUser.uid});
    setLoading(false)
  };
  return (
    <Container>
      <Title>Store Details</Title>
      <Divider />
      <Form
        form={form}
        requiredMark={false}
        layout="vertical"
        name="basic"
        initialValues={{
          businessName: currentUser.businessName,
          address: currentUser.address,
          description: currentUser.description,
          // gstin: currentUser.gstin,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Business Name"
          name="businessName"
          rules={[
            { required: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter a description describing your businesss",
            },
          ]}
        >
          <TextArea rows={5} />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter address " }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="GSTIN"
          name="gstin"
          rules={[{ required: true, message: "Please enter a valid GSTIN!" }]}
        >
          <Input />
        </Form.Item> */}
        <Button disabled={loading} style={{ width: "100%" }} type="primary">
          Save
        </Button>
      </Form>
    </Container>
  );
}
