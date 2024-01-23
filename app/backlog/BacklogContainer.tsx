import { Box, Button, Text } from '@chakra-ui/react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import { FaAngleDown, FaAngleRight, FaPlus } from 'react-icons/fa';
import BacklogEmpty from './BacklogEmpty';

const BacklogContainer = ({ createSprint }: any) => {
  const {
    setNodeRef,
    transition,
    transform,
    attributes,
    listeners,
    isDragging
  } = useSortable({ id: 'Back Log Main Conatiner' });

  const [backLogOpen, setBackLogOpen] = useState(false);

  return (
    <Box ref={setNodeRef} className="backlog-backlog-container">
      <Box className="backlog-backlog-header">
        <Box className="backlog-backlog">
          <Box onClick={() => setBackLogOpen(!backLogOpen)}>
            {backLogOpen ? <FaAngleDown /> : <FaAngleRight />}
          </Box>
          <Text>Backlog</Text> <Text>(0 issues)</Text>
        </Box>
        <Button onClick={createSprint} size={'sm'}>
          Create Sprint
        </Button>
      </Box>
      <Box className={!backLogOpen ? 'hide' : ''}>
        <SortableContext items={['backlog container']}>
          <BacklogEmpty />
          <Box></Box>
        </SortableContext>
        <Box className="backlog-create-sprint">
          <FaPlus /> <Text>Create issue</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default BacklogContainer;
