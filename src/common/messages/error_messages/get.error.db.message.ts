import { ErrorDbMsg } from '../../interfaces';

export const getErrorDbMessage = (code: string): string => {
  const errorDbMessages: ErrorDbMsg[] = [
    {
      code: 'P2000',
      message: `The provided value for the column is too long for the column's
      type. Column: {column_name}`,
    },
    {
      code: 'P2001',
      message: `The record searched for in the where condition
      ({model_name}.{argument_name} = {argument_value}) does not exist`,
    },
    {
      code: 'P2002',
      message: `Unique constraint failed on the {constraint}`,
    },
    {
      code: 'P2003',
      message: `Foreign key constraint failed on the field: {field_name}`,
    },
    {
      code: 'P2004',
      message: `A constraint failed on the database: {database_error}`,
    },
    {
      code: 'P2005',
      message: `The value {field_value} stored in the database for the field
      {field_name} is invalid for the field's type`,
    },
    {
      code: 'P2006',
      message: `The provided value {field_value} for {model_name} field {field_name}
      is not valid`,
    },
    {
      code: 'P2007',
      message: `Data validation error {database_error}`,
    },
    {
      code: 'P2008',
      message: `Failed to parse the query {query_parsing_error} at {query_position}`,
    },
    {
      code: 'P2009',
      message: `Failed to validate the query: {query_validation_error} at {query_position}`,
    },
    {
      code: 'P2000',
      message: `The provided value for the column is too long for the column's
      type. Column:`,
    },
    {
      code: 'P2010',
      message: `Raw query failed. Code: {code}. Message: {message}`,
    },
    {
      code: 'P2011',
      message: `Null constraint violation on the {constraint}`,
    },
    {
      code: 'P2025',
      message: `An operation failed because it depends on one or more records that
      were required but not found. {cause}`,
    },
  ];

  const message: ErrorDbMsg = errorDbMessages.find((element) => {
    if (element.code === code) {
      return element;
    }
  });

  return message.message;
};
