import useCustomToast, { StatusEnum } from '@/Hooks/useCustomToast';
import { COLOR_SCHEMES } from '@/utils/constants';
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tag,
  Text
} from '@chakra-ui/react';
import { useState } from 'react';
import './index.scss';

const COLUMN_COLOR_OPTIONS = [
  COLOR_SCHEMES.GRAY,
  COLOR_SCHEMES.BLACKALPHA,
  COLOR_SCHEMES.RED,
  COLOR_SCHEMES.ORANGE,
  COLOR_SCHEMES.YELLOW,
  COLOR_SCHEMES.GREEN,
  COLOR_SCHEMES.TEAL,
  COLOR_SCHEMES.BLUE,
  COLOR_SCHEMES.CYAN,
  COLOR_SCHEMES.PURPLE,
  COLOR_SCHEMES.LINKEDIN,
  COLOR_SCHEMES.PINK
];

const AddBoardColumnModal = ({ onClose, isOpen, onSubmit, onCancel }: any) => {
  const [value, setValue] = useState('');
  const [selectedColorScheme, setSelectedColorScheme] = useState(
    COLOR_SCHEMES.GRAY
  );
  const [callToast] = useCustomToast();

  const handleChange = (event: any) => setValue(event.target.value);

  const handleSubmit = () => {
    if (value.length > 0 && selectedColorScheme.length > 0) {
      onSubmit({
        title: value,
        color_scheme: selectedColorScheme
      });
    } else {
      callToast({ title: 'Enter valid column name', status: StatusEnum.error });
    }
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent
        className="add-board-column-modal-container"
        borderRadius={4}
      >
        <ModalHeader>Add new column</ModalHeader>
        <ModalCloseButton onClick={onClose} />

        <Divider />

        <ModalBody>
          <Text my={2}>Column name :</Text>
          <Input
            value={value}
            onChange={handleChange}
            placeholder="Ex: To Do"
            size="sm"
            autoFocus
            borderRadius={4}
            mb={2}
          />

          <Divider my={2} />

          <Text>Select style :</Text>
          <SimpleGrid columns={6} spacing={2} my={2}>
            {COLUMN_COLOR_OPTIONS.map((color, i) => (
              <Tag
                colorScheme={color}
                className={`column-title-style ${
                  selectedColorScheme === color ? 'selected-color-scheme' : ''
                }`}
                onClick={() => {
                  setSelectedColorScheme(color);
                }}
                key={i}
              >
                Title
              </Tag>
            ))}
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={onCancel}
            mr={4}
            variant={'outline'}
            colorScheme="red"
            size="sm"
            borderRadius={4}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit} size="sm" borderRadius={4}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBoardColumnModal;
