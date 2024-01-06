import { COLOR_SCHEMES, TASK_PRIORITY } from '@/utils/constants';
import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Tag,
  TagLabel,
  Text
} from '@chakra-ui/react';
import { FaMountain } from 'react-icons/fa';
import { HiChevronDoubleUp, HiChevronUp, HiMinus } from 'react-icons/hi';
import './index.scss';

interface Props {
  task: any;
}

const getPriorityTag = (priority: string) => {
  const priorityMappings = {
    [TASK_PRIORITY.LOW]: {
      colorScheme: COLOR_SCHEMES.BLACKALPHA,
      icon: <HiMinus />
    },
    [TASK_PRIORITY.MEDIUM]: {
      colorScheme: COLOR_SCHEMES.ORANGE,
      icon: <HiChevronUp />
    },
    [TASK_PRIORITY.HIGH]: {
      colorScheme: COLOR_SCHEMES.RED,
      icon: <HiChevronDoubleUp />
    }
  };

  const { colorScheme, icon } = priorityMappings[priority] || {};

  return (
    <Tag colorScheme={colorScheme} borderRadius={4}>
      {icon}
      <TagLabel ml={1}>{priority}</TagLabel>
    </Tag>
  );
};

const TaskCard = ({ task }: Props) => {
  return (
    <Card className="task-card-wrapper">
      <CardBody>
        <Flex justifyContent="space-between" alignItems="start" width="100%">
          <Text fontSize="sm" noOfLines={2} as="b">
            {task?.title}
          </Text>
          {/* <Button size={'sm'}>
            <FiMoreVertical />
          </Button> */}
        </Flex>
        <Flex gap={2} wrap="wrap" mt={4}>
          {task?.labels?.length > 0 &&
            task?.labels.map((label: string, index: number) => (
              <Tag key={index} size={'sm'}>
                {label}
              </Tag>
            ))}
        </Flex>
      </CardBody>
      <CardFooter>
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Flex alignItems="center" gap={2}>
            {getPriorityTag(task?.priority)}
            <Tag className="story-points">
              <FaMountain className="icon-size-extra-small" />
              <TagLabel ml={1}>{task?.story_points}</TagLabel>
            </Tag>
          </Flex>
          {task?.assignees && (
            <AvatarGroup size="sm" max={2} ml={2}>
              {task?.assignees.map((assignee: any, index: number) => (
                <Avatar
                  key={index}
                  name={assignee?.name}
                  src={assignee?.image_url}
                />
              ))}
            </AvatarGroup>
          )}
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
