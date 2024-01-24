'use client';
import React, { useEffect, useMemo, useState } from 'react';
import './backlog.scss';
import { Box } from '@chakra-ui/react';
import Navigator from '@/components/Navigator/Navigator';
import { SortableContext } from '@dnd-kit/sortable';
import SprintContainer from './SprintContainer';
import BacklogContainer from './BacklogContainer';
import { v4 as uuidv4 } from 'uuid';

const Backlog = () => {
  const [sprintArray, setSprintArray] = useState<any>([]);
  const [issueArray, setIssueArray] = useState<any>([]);

  // useEffect(()=>{
  //   recalculateIssues();
  // },[issueArray])

  const sprintsId = useMemo(() => {
    return sprintArray.map((sprint: any) => sprint.id);
  }, [sprintArray]);

  function createSprint() {
    const newSprint = {
      name: `Sprint ${sprintArray.length + 1}`,
      id: uuidv4(),
      issues: []
    };

    setSprintArray([...sprintArray, newSprint]);
  }
  console.log(sprintArray, sprintsId);

  function createIssue(sprintId: any) {
    const newIssue = {
      name: `Issue ${issueArray.length + 1}`,
      sprintId,
      labels: [],
      storyPoints: 0
    };

    setIssueArray([...issueArray, newIssue]);
  }

  // function recalculateIssues() {
  //   const newSprintArray = [];
  //   const newBacklogArray = [];
  //   issueArray.forEach((issue:any) => {
  //     if(issue.sprint === 'backlog') {
  //       newBacklogArray.push(issue);
  //     } else {
  //       newSprintArray.push(issue);
  //     }
  //   });
  //   set
  // }

  return (
    <Box className="backlog-main-container">
      <Navigator />
      <Box className="backlog-sub-container">
        <Box className="backlog-sprints-container">
          {sprintArray.length > 0 && (
            <SortableContext items={sprintsId}>
              {sprintArray.map((sprint: any) => (
                <SprintContainer
                  issues={issueArray}
                  sprint={sprint}
                  createIssue={createIssue}
                  key={sprint.id}
                />
              ))}
            </SortableContext>
          )}
        </Box>
        <Box className="backlog-backlog-container">
          <BacklogContainer
            issues={issueArray.filter(
              (issue: any) => issue.sprint === 'backlog'
            )}
            createIssue={createIssue}
            createSprint={createSprint}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Backlog;
