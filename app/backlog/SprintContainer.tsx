import { Box, Text } from '@chakra-ui/react';
import emptyBoard from '../../assets/icons/empty-board.svg';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaAngleDown, FaAngleRight, FaPlus } from 'react-icons/fa';

const SprintContainer = ({ createIssue, sprint, issueArray }: any) => {
  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({
      id: sprint.id,
      data: { type: 'Sprint', sprint }
    });

  const [sprintOpen, setSprintOpen] = useState<Boolean>(false);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <Box
      ref={setNodeRef}
      // {...attributes}
      // {...listeners}
      style={style}
      className="backlog-sprint-container"
    >
      <Box {...attributes} {...listeners} className="backlog-sprint">
        <Box onClick={() => setSprintOpen(!sprintOpen)}>
          {sprintOpen ? <FaAngleDown /> : <FaAngleRight />}
        </Box>{' '}
        <Text>{sprint.name}</Text> <Text>(0 issues)</Text>
      </Box>
      <Box className={!sprintOpen ? 'hide' : ''}>
        <Box className="backlog-sprint-drop-empty">
          <Box className="backlog-sprint-sub-empty">
            <Box>
              <Image width={100} src={emptyBoard} alt="Empty Board" />
            </Box>
            <Box>
              <Text>Plan your sprint</Text>
              <Text>
                Drag issues from the <strong>Backlog</strong> section, or create
                new issues, to plan the work for this sprint. Select{' '}
                <strong>Start sprint</strong> when youre ready.
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          onClick={() => createIssue(sprint.id)}
          className="backlog-create-issue"
        >
          <FaPlus /> <Text>Create issue</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SprintContainer;
