import {
  Button,
  Flex,
  Stack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import homeimg from "../asset/homeimg.jpg";
function Home() {
  return (
    <>
    <Helmet><title>Welcome</title></Helmet>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"} bg={"#f5f5f5"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "6xl" }}>
              <Text color={"blue.400"} as={"span"}>
                Welcome to Wells Fargo
              </Text>
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              Building better every day.
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Link to="/login">
                <Button
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  User Login
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Admin Login
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1} bg={"#f5f5f5"}>
          <Image alt={"Login Image"} src={homeimg} />
        </Flex>
      </Stack>
    </>
  );
}

export default Home;
