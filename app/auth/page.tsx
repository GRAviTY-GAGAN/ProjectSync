'use client';
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
import React, { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import './index.scss';
import { motion } from 'framer-motion';

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CardBody>
                {isLoginForm ? (
                  <Box className="login-form">
                    <Text className="welcome">Welcome Back</Text>
                    <Text className="welcome-tagline">
                      Before we can get your day started, let's sign in.
                    </Text>

                    <Text className="input-label">Email</Text>
                    <Input
                      className="input-element"
                      focusBorderColor="#0f172a"
                      placeholder="Enter your email"
                    />
                    <Text className="input-label">Password</Text>
                    <Input
                      className="input-element"
                      focusBorderColor="#0f172a"
                      placeholder="Enter your password"
                    />

                    <Text className="signup-tagline">
                      Don't have an account ?{' '}
                      <span onClick={() => setIsLoginForm(false)}>
                        Create one
                      </span>
                    </Text>

                    <Button
                      className="login-cta"
                      rightIcon={
                        <FaArrowRightLong className="icon-size-small" />
                      }
                    >
                      Login
                    </Button>

                    <Button
                      className="test-login-cta"
                      variant={'outline'}
                      rightIcon={
                        <FaArrowRightLong className="icon-size-small" />
                      }
                    >
                      Continue with test credentials
                    </Button>
                  </Box>
                ) : (
                  <Box className="login-form">
                    <Text className="welcome" mb={8}>
                      Welcome, Create your account
                    </Text>
                    <Text className="input-label">Name</Text>
                    <Input
                      className="input-element"
                      focusBorderColor="#0f172a"
                      placeholder="Enter your name"
                    />

                    <Text className="input-label">Email</Text>
                    <Input
                      className="input-element"
                      focusBorderColor="#0f172a"
                      placeholder="Enter your email"
                    />
                    <Text className="input-label">Password</Text>
                    <Input
                      className="input-element"
                      focusBorderColor="#0f172a"
                      placeholder="Enter your password"
                    />

                    <Text className="signup-tagline">
                      Already have an account ?{' '}
                      <span onClick={() => setIsLoginForm(true)}>Log In</span>
                    </Text>

                    <Button
                      className="login-cta"
                      rightIcon={
                        <FaArrowRightLong className="icon-size-small" />
                      }
                    >
                      Sign Up
                    </Button>
                  </Box>
                )}
              </CardBody>
            </motion.div>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
