import { Box, Text } from '@chakra-ui/react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { FaAngleDown, FaAngleRight, FaPlus } from 'react-icons/fa';
import BacklogEmpty from './BacklogEmpty';

const BacklogMainContainer = ({
  backLogArray,
  backLogOpen,
  setBackLogOpen
}: any) => {
  const {
    setNodeRef,
    transition,
    transform,
    attributes,
    listeners,
    isDragging
  } = useSortable({ id: 'Back Log Main Conatiner' });

  return (
    <Box ref={setNodeRef} className="backlog-backlog-container">
      <Box className="backlog-backlog">
        <Box onClick={() => setBackLogOpen(!backLogOpen)}>
          {backLogOpen ? <FaAngleDown /> : <FaAngleRight />}
        </Box>
        <Text>Backlog</Text> <Text>({backLogArray.length} issues)</Text>
      </Box>
      <Box className={!backLogOpen ? 'hide' : ''}>
        <SortableContext items={['backlog container']}>
          <BacklogEmpty backLogArray={backLogArray} />
          <Box></Box>
        </SortableContext>
        <Box className="backlog-create-sprint">
          <FaPlus /> <Text>Create issue</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default BacklogMainContainer;
