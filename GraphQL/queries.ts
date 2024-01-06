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

export const ADD_UPDATE_COLUMN_TO_PROJECT = gql`
  mutation updateColumnsInProject($updateColumnsDto: UpdateColumnsDto!) {
    updateColumnsInProject(updateColumnsDto: $updateColumnsDto) {
      message
      status
    }
  }
`;
export const GET_PROJECT_COLUMNS = gql`
  query getProjectById($id: String!) {
    getProjectById(id: $id) {
      message
      status
      data {
        columns {
          color_scheme
          id
          title
        }
      }
    }
  }
`;
