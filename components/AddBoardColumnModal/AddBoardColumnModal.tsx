import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import React from 'react';

const AddBoardColumnModal = ({ onClose, isOpen, onSubmit, onCancel }: any) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new column</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onCancel} mr={4}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBoardColumnModal;
