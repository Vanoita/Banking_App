import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  useMediaQuery,
  Card,
  CardHeader,
  CardBody,
  CardFooter, Heading
} from "@chakra-ui/react";
import { Link} from 'react-router-dom';
import Login from './Login.js';
import { useEffect, useState } from "react";
function Home() {
  const [isLargerThan62] = useMediaQuery("(min-width: 62em)");
  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem('userId');
      if(token) {
        navigate("/dashboard");
      }
  })
  return (
    /*localStorage.getItem('username') ? */ <>
      <Flex
        alignItems="center"
        w="full"
        px={isLargerThan62 ? "16" : "6"}
        py="16"
        minHeight="90vh"
        justifyContent="space-between"
        flexDirection={isLargerThan62 ? "row" : "column"}
      >
        <Box
          mr={isLargerThan62 ? "6" : "0"}
          w={isLargerThan62 ? "60%" : "full"}
        >
          <Text
            fontSize={isLargerThan62 ? "5xl" : "4xl"}
            fontWeight="bold"
            mb="4"
          >
            {" "}
            Welcome to Wells Fargo
          </Text>

          <Text mb="6" fontSize={isLargerThan62 ? "lg" : "base"} opacity={0.7}>
            Building better every day
          </Text>

          <Button
            w="200px"
            colorScheme="blue"
            variant="solid"
            h="50px"
            size={isLargerThan62 ? "lg" : "md"}
            mb={isLargerThan62 ? "0" : "10"}
          >
            <Link to="/createAccount">Create Account</Link>
          </Button>
        </Box>

        <Spacer />

        <Flex
          w={isLargerThan62 ? "40%" : "full"}
          alignItems="center"
          justifyContent="center"
        >
          {/* <Card align="center">
            <CardHeader>
              <Heading size="md"> Customer dashboard</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                View a summary of all your customers over the last month.
              </Text>
            </CardBody>
            <CardFooter>
              <Button colorScheme="blue">View here</Button>
            </CardFooter>
          </Card> */}
          <Login/>
        </Flex>
      </Flex>
    </>
  ); /*:(
        <Navigate
            replace={true}
            to="/login"
            state={{ from: `${location.pathname}${location.search}` }}
        />
    )*/
}

export default Home;
