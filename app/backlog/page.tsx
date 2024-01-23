'use client';
import { Avatar, AvatarGroup, Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import './backlog.scss';
import Navigator from '@/components/Navigator/Navigator';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { TasksMockData } from '../../utils/mockdata';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import SprintCard from './SprintCard';
import BacklogContainer from './BacklogContainer';
import BacklogEmpty from './BacklogEmpty';
import BacklogMainContainer from './BacklogMainContainer';

const Backlog = () => {
  const [sprintOpen, setSprintOpen] = useState<Boolean>(false);
  const [sprintArray, setSprintArray] = useState<any>([]);
  const [backLogOpen, setBackLogOpen] = useState<Boolean>(false);
  const [TasksMockDatas, setTasksMockDatas] = useState<any>(TasksMockData);
  const [backLogArray, setBackLogArray] = useState<any>([]);
  const [activeCard, setActiveCard] = useState<any>();

  function handleDragEnd(event: DragEndEvent) {
    console.log(TasksMockData, 'TD', event);
    const { active, over } = event;

    // if (active.id != over?.id) {
    //   setTasksMockDatas((prev: any) => {
    //     const startIndex = prev.findIndex((item: any) => item.id === active.id);
    //     const destinationIndex = prev.findIndex(
    //       (item: any) => item.id === over?.id
    //     );

    //     return arrayMove(prev, startIndex, destinationIndex);
    //   });
    // }
    setActiveCard(null);
  }

  function handleDragStart(event: DragStartEvent) {
    console.log(event, 'START');
    setActiveCard(event.active.data.current?.item);
  }

  function checkExist(activeCard: any) {
    return backLogArray.some((card: any) => card.id === activeCard.id);
  }

  function handleDragOver(event: DragOverEvent) {
    console.log(event, 'OVER', TasksMockData);
    if (event.over?.id === 'Back Log Main Conatiner') {
      setBackLogOpen(true);
      if (!checkExist(activeCard)) {
        setBackLogArray([...backLogArray, activeCard]);
      }
    }
  }

  return (
    <Box className="backlog-main-container">
      <Navigator />
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <Box className="backlog-sub-container">
          <Box>
            <Box className="backlog-sprint-container">
              <Box className="backlog-sprint">
                <Box onClick={() => setSprintOpen(!sprintOpen)}>
                  {sprintOpen ? <FaAngleDown /> : <FaAngleRight />}
                </Box>{' '}
                <Text>Sprint</Text>{' '}
                <Text>({TasksMockDatas?.length} issues)</Text>
              </Box>
              <Box className={!sprintOpen ? 'hide' : ''}>
                <Box
                  className={
                    TasksMockDatas.length
                      ? 'backlog-sprint-drop'
                      : 'backlog-sprint-drop-empty'
                  }
                >
                  <Box className="backlog-issue-card-container">
                    <SortableContext
                      items={TasksMockDatas}
                      strategy={verticalListSortingStrategy}
                    >
                      {TasksMockDatas.length > 0 && (
                        <Box>
                          {TasksMockDatas.map((item: any) => (
                            <SprintCard key={item?.id} item={item} />
                          ))}
                        </Box>
                      )}
                    </SortableContext>
                  </Box>
                  <Box>
                    <SortableContext items={['Backlog Sprint Empty']}>
                      {TasksMockDatas.length === 0 && <BacklogContainer />}
                    </SortableContext>
                  </Box>
                </Box>
                <Box className="backlog-create-sprint">
                  <FaPlus /> <Text>Create issue</Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <SortableContext items={['Backlog Main Container']}>
              <BacklogMainContainer
                backLogOpen={backLogOpen}
                setBackLogOpen={setBackLogOpen}
                backLogArray={backLogArray}
              />
            </SortableContext>
          </Box>
        </Box>
        <DragOverlay>
          {activeCard && <SprintCard item={activeCard} />}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};

export default Backlog;
