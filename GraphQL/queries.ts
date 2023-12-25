import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation createTask($createTaskDto: CreateTaskDto!) {
    createTask(createTaskDto: $createTaskDto) {
      message
      status
      data {
        name
        priority
        description
        dueDate
        attachments {
          secureUrl
          assetId
          publicId
        }
        label
        assignee
        parentTaskId
        projectId
        storyPoints
        sprintId
      }
    }
  }
`;

export const DELETE_ATTACHMENTS = gql`
  mutation deleteUploads($attachments: [AttachmentsInput!]!) {
    deleteUploads(attachments: $attachments) {
      message
      status
    }
  }
`;
