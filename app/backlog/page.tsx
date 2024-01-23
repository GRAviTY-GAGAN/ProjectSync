'use client';
import React, { useMemo, useState } from 'react';
import './backlog.scss';
import { Box } from '@chakra-ui/react';
import Navigator from '@/components/Navigator/Navigator';
import { SortableContext } from '@dnd-kit/sortable';
import SprintContainer from './SprintContainer';
import BacklogContainer from './BacklogContainer';
import { v4 as uuidv4 } from 'uuid';

const Backlog = () => {
  const [sprintArray, setSprintArray] = useState<any>([]);

  const sprintsId = useMemo(() => {
    return sprintArray.map((sprint: any) => sprint.id);
  }, [sprintArray]);

  function createSprint() {
    const newSprint = {
      name: `Sprint ${sprintArray.length + 1}`,
      id: uuidv4()
    };

    setSprintArray([...sprintArray, newSprint]);
  }

  return (
    <Box className="backlog-main-container">
      <Navigator />
      <Box className="backlog-sub-container">
        <Box className="backlog-sprints-container">
          {sprintArray.length > 0 && (
            <SortableContext items={sprintsId}>
              {sprintArray.map((sprint: any) => (
                <SprintContainer key={sprint.id} />
              ))}
            </SortableContext>
          )}
        </Box>
        <Box className="backlog-backlog-container">
          <BacklogContainer createSprint={createSprint} />
        </Box>
      </Box>
    </Box>
  );
};

export default Backlog;
