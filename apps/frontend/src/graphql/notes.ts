import { gql } from '@apollo/client';

export const GET_NOTES = gql`
  query GetNotes {
    notes(orderBy: { created_datetime: "desc" }) {
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
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
      title
      text
      created_datetime
      updated_datetime
    }
  }
`;
