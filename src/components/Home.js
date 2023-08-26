import {
  Box,
  Button,
  Text,
  SimpleGrid
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm.js';
function Home() {
  return (
    <>
      <SimpleGrid columns={2} align={"center"} >
        <Box mr={"6"} px={"16"} py={"20"} mt={"25"}
        >

          <Text
            fontSize={"4xl"}
            fontWeight="bold"
            mb="4"
          >
            {" "}
            Welcome to Wells Fargo
          </Text>

          <Text mb="6" fontSize={"base"} opacity={0.7}>
            Building better every day
          </Text>
          <SimpleGrid rows={2}>
            <Box>
              <Button
                w="200px"
                colorScheme="blue"
                variant="solid"
                h="50px"
                size={"md"}
                mb={"10"}
              >
                <Link to="/createAccount">Create Account</Link>
              </Button>
            </Box>
            <Box>
              <Button
                w="200px"
                colorScheme="blue"
                variant="solid"
                h="50px"
                size={"md"}
                p={"5"}
                mb={"10"}
              >
                <Link to="/loginAdmin">Admin Login</Link>
              </Button>
            </Box>
          </SimpleGrid>



        </Box>
        <Box bg="#F5F5F5">
          <LoginForm />
        </Box>
      </SimpleGrid >
    </>
  );
}

export default Home;
