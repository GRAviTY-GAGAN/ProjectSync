import { Box, Text } from '@chakra-ui/react';
import emptyBoard from '../../assets/icons/empty-board.svg';
import Image from 'next/image';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const BacklogContainer = () => {
  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({
      id: 'BacklogContainer',
      data: { type: 'Backlog Container' }
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="backlog-main-empty-container"
    >
      <Box className="backlog-sub-empty-container">
        <Box>
          <Image width={100} src={emptyBoard} alt="Empty Board" />
        </Box>
        <Box>
          <Text>Plan your sprint</Text>
          <Text>
            Drag issues from the <strong>Backlog</strong> section, or create new
            issues, to plan the work for this sprint. Select{' '}
            <strong>Start sprint</strong> when youre ready.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default BacklogContainer;
