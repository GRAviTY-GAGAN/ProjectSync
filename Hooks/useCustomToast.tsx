import React from 'react';
import { useToast } from '@chakra-ui/react';

interface ToastProps {
  title: string;
  description?: string;
  status: StatusEnum;
  position?: PositionEnum;
}

export enum StatusEnum {
  info = 'info',
  warning = 'warning',
  success = 'success',
  error = 'error',
  loading = 'loading'
}

export enum PositionEnum {
  top = 'top',
  topRight = 'top-right',
  topLeft = 'top-left',
  bottom = 'bottom',
  bottomRight = 'bottom-right',
  bottomLeft = 'bottom-left'
}

const useCustomToast = () => {
  const toast = useToast();
  function callToast({
    title,
    description,
    status,
    position = PositionEnum.topRight
  }: ToastProps) {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position
    });
  }

  return [callToast];
};

export default useCustomToast;
