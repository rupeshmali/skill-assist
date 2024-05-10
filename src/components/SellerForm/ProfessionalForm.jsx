import React, { useState } from "react";
import styled from "styled-components";
import { Form, message, Radio } from "antd";
import { Input, Space, TextArea, Button } from "@components/custom";
import { colors } from "@themes";
import { VALIDATIONS } from "@utils/constants";


export default function ProfessionalForm({
  professionalForm,
  currentUser,
  userUpdate,
}) {
  
  const handleSubmit = async (values) => {
    const {businessName, address, description} = values;
    try {
      if (!businessName) {
        throw new Error("Please enter Business Name");
      }
      if (!description) {
        throw new Error("Please enter Description");
      }
      if (!address) {
        throw new Error("Please enter Address");
      }
     if(businessName.length > 30){
       throw new Error("Business name cannot be more than 30 characters ")
     }
     if(description.length<30){
      throw new Error("Description must be atleast 30 characters");
     }
     if(description.length>5000){
      throw new Error("Description must be less than 5000 characters");
     }
     if(address.length>100){
      throw new Error(" Invalid City");
     }
      await userUpdate({ ...values });
    } catch (err) {
     
      message.error(<strong>{err.message}</strong>);
    }
  };
  return (
    <div>
      <Space top="2em" />
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        form={professionalForm}
        requiredMark={false}
        initialValues={{
          // aadharOrPan: currentUser.aadharOrPan,
          businessName: currentUser.businessName,
          description: currentUser.description,
          address: currentUser.address,
        }}
      >
        <Form.Item
          label="Bussiness Name"
          name="businessName"
         
        >
          <Input type="text" placeholder="Eg. Baker's Stop" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={3} placeholder="Short Description of your offering" />
        </Form.Item>
        <Form.Item label="City" name="address">
          <Input rows={3} placeholder="Nashik" />
        </Form.Item>
        <Button type="primary" style={{ width: "100%" }}>
          Save
        </Button>
      </Form>
    </div>
  );
}
