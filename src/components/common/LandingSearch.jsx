import React, { useState } from "react";
import styled from "styled-components";
import FeatherIcon from "feather-icons-react";
import { styles, colors } from "@themes";
import { Select, Menu, Dropdown,Typography } from "antd";
import { Button, Field } from "@components/custom";
const { Option } = Select;
const {Text} =Typography;
const SearchBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 60px;
  width: 100%;
  background-color: white;
  height: 60px;
  border: 2px solid ${colors.greyLight};
  box-shadow: ${styles.boxShadow};
  border-radius: ${styles.borderRadius};
  @media (max-width: 500px) {
    grid-template-columns: 2fr 1fr 50px;
    height: 50px;
  }
`;
const Input = styled.input`
  width: 95%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 20px;
  color:${colors.grey};
  
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 400px) {
    padding: 0 12px;
  }
`;
const SearchButton = styled.button`
  margin: 5px;
  width: 50px;
  border: none;
  outline: none;
  border-radius: ${styles.borderRadius};
  background-color: ${colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 500px) {
    width: 40px;
  }
`;

const CustomSelect = styled(Select)`
  width: 20rem;
  height: 10vh;
`;
export default function LandingSearch() {
  const dataList = ["Nashik", "Pune", "Mumbai"];
  const [selected, setSelected] = useState("Choose City");
  const [search, setSearch] = useState("");
  const menu = (

<Menu>
    <Menu.Item>
     <label>Nashik</label>
    </Menu.Item>
    <Menu.Item>
     <label>Pune</label>
    </Menu.Item>
    <Menu.Item>
     <label>Mumbai</label>
    </Menu.Item>
    </Menu>
  );
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <SearchBox>
      <Input
        type="text"
        placeholder="Search for services"
        value={search}
        onChange={handleChange}
      />
      <Field>
   <Dropdown overlay={menu} trigger={['click']}>
   <Text style={{marginTop:"1.1rem" ,color:`${colors.grey}`}}>
    Select City
   </Text>
  </Dropdown>
  </Field>
      <SearchButton>
        <FeatherIcon icon="search" color="white" size="20" />
      </SearchButton>
    </SearchBox>
  );
}
