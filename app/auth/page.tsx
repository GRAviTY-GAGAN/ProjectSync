import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import './index.scss';

const Auth = () => {
  return (
    <Box className="auth-container-wrapper">
      <Box className="auth-container">
        <Box className="auth-left">
          <Heading as="h1" size={'xl'} className="tagline">
            Simplify projects, boost efficiency where collaboration sparks
            productivity.
          </Heading>
        </Box>
        <Box className="auth-right">
          <Card className="auth-form">
            <Text className="product-title">ProjectSync</Text>
            <CardBody>
              <Box className="login-form">
                <Text className="welcome">Welcome Back</Text>
                <Text className="welcome-tagline">
                  Before we can get your day started, let's sign in.
                </Text>

                <Text className="input-label">Email</Text>
                <Input
                  className="input-element"
                  focusBorderColor="#2a6374"
                  placeholder="Enter your email"
                />
                <Text className="input-label">Password</Text>
                <Input
                  className="input-element"
                  focusBorderColor="#2a6374"
                  placeholder="Enter your password"
                />

                <Text className="signup-tagline">
                  Don't have an account ? <span>Create one</span>
                </Text>

                <Button
                  className="login-cta"
                  rightIcon={<FaArrowRightLong className="icon-size-small" />}
                >
                  Login
                </Button>

                <Button
                  className="test-login-cta"
                  variant={'outline'}
                  rightIcon={<FaArrowRightLong className="icon-size-small" />}
                >
                  Continue with test credentials
                </Button>
              </Box>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
