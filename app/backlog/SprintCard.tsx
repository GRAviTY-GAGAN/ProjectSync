import { Avatar, AvatarGroup, Box, Text } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import './backlog.scss';

const SprintCard = ({ item }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item?.id, data: { item, type: 'Card' } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="backlog-overlay-card"
      ></div>
    );
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="backlog-issue-card"
      key={item.id}
    >
      <Box className="backlog-title-assignee">
        <Text>{item.title}</Text>
        <AvatarGroup size="sm">
          {item.assignees.map((assignee: any, index: any) => (
            <Avatar key={index} name={assignee.name} src={assignee.image_url} />
          ))}
        </AvatarGroup>
      </Box>
      <Box className="backlog-labels-container">
        {item.labels.map((label: any, index: number) => (
          <Text className="backlog-label" key={index}>
            {label}
          </Text>
        ))}
      </Box>
    </Box>
  );
};

export default SprintCard;
