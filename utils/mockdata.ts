// delete this file when all api integration is completed

import { TASK_PRIORITY } from './constants';

export const TasksMockData = [
  {
    id: '1',
    title: 'Create/Edit project dialog',
    labels: ['Frontend Development', 'UI', 'SCREENS'],
    attachments: 3,
    comments: 12,
    priority: TASK_PRIORITY.LOW,
    story_points: 3,
    column_id: '8185',
    assignees: [
      {
        name: 'John Doe',
        image_url: ''
      }
    ]
  },
  {
    id: '2',
    title: 'Auth - Signin/signup/Forgot password (low)',
    labels: ['API Development'],
    attachments: 3,
    comments: 12,
    priority: TASK_PRIORITY.HIGH,
    story_points: 8,
    column_id: '1773',
    assignees: [
      {
        name: 'John Doe',
        image_url: ''
      },
      {
        name: 'Michael',
        image_url: ''
      }
    ]
  }
];
