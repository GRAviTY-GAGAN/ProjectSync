import { Box, Text } from '@chakra-ui/react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import SprintCard from './SprintCard';

const BacklogEmpty = ({ backLogArray }: any) => {
  const {
    setNodeRef,
    transition,
    transform,
    attributes,
    listeners,
    isDragging
  } = useSortable({
    id: 'BacklogEmpty Container',
    data: { type: 'BacklogEmpty Container', array: backLogArray }
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <Box>
      <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {backLogArray.length === 0 && (
          <Box className="backlog-backlog-drop-empty">
            <Text>Your backlog is empty.</Text>
          </Box>
        )}{' '}
        {backLogArray.length > 0 && (
          <Box>
            <SortableContext items={backLogArray}>
              {backLogArray.map((card: any) => (
                <SprintCard key={card.id} item={card} />
              ))}
            </SortableContext>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BacklogEmpty;
