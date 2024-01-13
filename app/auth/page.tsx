/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
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
import useCustomToast, { StatusEnum } from '@/Hooks/useCustomToast';
import { useMutation } from '@apollo/client';
import { CREATE_USER, LOGIN } from '@/graphql/queries';
import { useRouter } from 'next/navigation';

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUser] = useMutation(CREATE_USER);
  const [userLogin] = useMutation(LOGIN);

  const [callToast] = useCustomToast();
  const router = useRouter();

  function signUp() {
    if (name && email && password) {
      const createUserDto = { name, email, password };
      createUser({ variables: { createUserDto } })
        .then(res => {
          console.log(res);
          const response = res?.data.createUser;

          if (response.status) {
            router.replace('/');
            callToast({
              title: response.message,
              status: StatusEnum.success
            });
          } else {
            callToast({
              title: response.message,
              status: StatusEnum.warning
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      callToast({
        title: 'Insufficient details.',
        description: 'Please fill all the fields',
        status: StatusEnum.info
      });
    }
  }

  function logIn() {
    if (email && password) {
      const loginUserInput = { email, password };
      userLogin({ variables: { loginUserInput } })
        .then(res => {
          console.log(res);
          const response = res?.data.login;
          if (response.status) {
            router.replace('/');
            callToast({
              title: response.message,
              status: StatusEnum.success
            });
          } else {
            callToast({
              title: response.message,
              status: StatusEnum.warning
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      callToast({
        title: 'Insufficient details.',
        description: 'Please fill all the fields',
        status: StatusEnum.info
      });
    }
  }

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
                      onChange={e => setEmail(e.target.value)}
                      className="input-element"
                      focusBorderColor="#0f172a"
                      placeholder="Enter your email"
                    />
                    <Text className="input-label">Password</Text>
                    <Input
                      onChange={e => setPassword(e.target.value)}
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
                      onClick={logIn}
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
                      onChange={e => setName(e.target.value)}
                      className="input-element"
                      focusBorderColor="#0f172a"
                      placeholder="Enter your name"
                    />

                    <Text className="input-label">Email</Text>
                    <Input
                      onChange={e => setEmail(e.target.value)}
                      className="input-element"
                      focusBorderColor="#0f172a"
                      placeholder="Enter your email"
                    />
                    <Text className="input-label">Password</Text>
                    <Input
                      onChange={e => setPassword(e.target.value)}
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
                      onClick={signUp}
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
