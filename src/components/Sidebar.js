import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar, Menu, MenuButton, Icon,
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
import { MdAddCard } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useLocation();

  const successToastMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "success2"
    });
  };

  const errorToastMessage = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "error2"
    });
  };

  const logout = () => {
    localStorage.removeItem('userId');
    navigate("/");
  };
  const fetchUser = (baseURLUser) => {
    axios
      .get(baseURLUser)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        alert("error occured while loading data" + error);
      });
  };
  useEffect(() => {
    if (state && state.message && state.type) {
      if (state.type === "success") {
        successToastMessage(state.message);
      }
      else {
        errorToastMessage(state.message);
      }
      window.history.replaceState({ state: null }, document.title);
    }
    const token = localStorage.getItem("userId");
    if (!token) {
      navigate("/login", { state: { from: `${location.pathname}${location.search}` } });
    }
    const baseURLUser = "http://localhost:8080/fetchUser/" + token;

    fetchUser(baseURLUser);
  }, [state, location.pathname, location.search, navigate]);
  return (
    <>
      <Flex
        pos="sticky"
        left="5"
        h="95vh"
        marginTop="2.5vh"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        borderRadius={navSize === "small" ? "15px" : "30px"}
        w={navSize === "small" ? "75px" : "200px"}
        flexDir="column"
        justifyContent="space-between"
        bg={"#F5F5F5"}
      >
        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize === "small" ? "center" : "flex-start"}
          as="nav"
        >
          <IconButton
            background="none"
            mt={5}
            _hover={{ background: "none" }}
            icon={<FiMenu />}
            onClick={() => {
              if (navSize === "small") changeNavSize("large");
              else changeNavSize("small");
            }}
          />
          <NavItem navSize={navSize} icon={FiHome} title="Dashboard" active to="/dashboard" />
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
          <NavItem navSize={navSize} icon={MdAddCard} title="Create Account" to="/createAccount" />

          <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize === "small" ? "center" : "flex-start"} onClick={logout}
          >
            <Menu placement="right">
              <Link
                p={3}
                borderRadius={8}
                _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
                w={navSize === "large" && "100%"}
              >
                <MenuButton w="100%">
                  <Flex>
                    <Icon as={FiLogOut} fontSize="xl" color={"gray.500"} />
                    <Text ml={5} display={navSize === "small" ? "none" : "flex"}>Log Out</Text>
                  </Flex>
                </MenuButton>
              </Link>
            </Menu>
          </Flex>
        </Flex>

        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize === "small" ? "center" : "flex-start"}
          mb={4}
        >
          <Divider display={navSize === "small" ? "none" : "flex"} />
          <Flex mt={4} align="center" alignItems={"center"}>
            <Link to="/profile">
              <Avatar size="sm" src="avatar-1.jpg" />
            </Link>
            <Flex
              flexDir="column"
              ml={4}
              display={navSize === "small" ? "none" : "flex"}
            >
              <Heading as="h3" size="sm">
                {user.firstName} {user.lastName}
              </Heading>
              <Text color="gray">{user.userId}</Text>
            </Flex>

          </Flex>
        </Flex>
      </Flex>
      <ToastContainer/>
    </>
  );
}
