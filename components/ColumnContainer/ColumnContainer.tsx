import { Box } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Column, ID } from '../../types';
import { useState } from 'react';
interface Props {
  column: Column;
  updateColumnTitle: (id: ID, title: string) => void;
}

const ColumnContainer = (props: Props) => {
  const { column, updateColumnTitle } = props;

  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    transition,
    transform,
    attributes,
    listeners,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    },
    disabled: editMode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };
  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style}>
        Hello
      </div>
    );
  }
  return (
    <Box
      minW="20vw"
      minH="60vh"
      borderRadius={4}
      border="1px"
      borderColor="gray.200"
      backgroundColor={'#f8fafc'}
      overflowY={'scroll'}
      mr={3}
      ref={setNodeRef}
      style={style}
    >
      <div
        {...attributes}
        {...listeners}
        style={{ cursor: 'pointer' }}
        onClick={() => setEditMode(true)}
      >
        {!editMode && column.title}
        {editMode && (
          <input
            value={column.title}
            onChange={e => updateColumnTitle(column.id, e.target.value)}
            autoFocus
            onBlur={() => setEditMode(false)}
            onKeyDown={e => {
              if (e.key !== 'Enter') return;
              setEditMode(false);
            }}
          />
        )}
      </div>
    </Box>
  );
};

export default ColumnContainer;
