import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiRepeat,
  FiDollarSign,
  FiLogOut,
  FiUserPlus
} from "react-icons/fi";
import NavItem from "../components/NavItem";

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
  const [user, setUser] = useState({});
  const fetchUser = (baseURLUser) => {
    axios
      .get(baseURLUser)
      .then((response) => {
        setUser(response.data);
        //alert(JSON.stringify(response))
      })
      .catch((error) => {
        alert("error occured while loading data" + error);
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("userId");
    /*if(!token) {
                navigate("/login",{state:{from: `${location.pathname}${location.search}`}});
            }
            else {*/
    const baseURLUser = "http://localhost:8080/fetchUser/" + token;

    fetchUser(baseURLUser);
  }, []);
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
      bg={"#F5F5F5"}
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        <NavItem navSize={navSize} icon={FiHome} title="Dashboard" active to="/dashboard"/>
        <NavItem navSize={navSize} icon={FiRepeat} title="Transfer" to="/transaction" />
        <NavItem
          navSize={navSize}
          icon={FiDollarSign}
          title="Transaction History"
          to="/transactionhistory"
        />
        <NavItem
          navSize={navSize}
          icon={FiUserPlus}
          title="Add Beneficiary"
          to="/addBeneficiary"
        />

        <NavItem navSize={navSize} icon={FiLogOut} title="Log out"/>
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center" alignItems={"center"}>
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              {user.firstName} {user.lastName}
            </Heading>
            <Text color="gray">User</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
