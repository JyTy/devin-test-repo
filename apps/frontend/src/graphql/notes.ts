import { gql } from '@apollo/client';

export const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      title
      created_datetime
    }
  }
`;

export const GET_NOTE = gql`
  query GetNote($id: ID!) {
    note(id: $id) {
      id
      title
      text
      created_datetime
      updated_datetime
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation CreateNote($title: String, $text: String!) {
    createNote(title: $title, text: $text) {
      id
      title
      text
      created_datetime
      updated_datetime
    }
  }
`;
