import { ErrorMsg } from '../../interfaces';

export const getErrorMessage = (code: string): string => {
  const errorMessages: ErrorMsg[] = [
    {
      code: 'E001',
      message: `The product with id: "&" not found`,
    },
    {
      code: 'E002',
      message: `Credentials are not valid for id: "&"`,
    },
    {
      code: 'E003',
      message: `Token not valid`,
    },
    {
      code: 'E004',
      message: `User is inactive`,
    },
  ];

  const message: ErrorMsg = errorMessages.find((element) => {
    if (element.code === code) {
      return element;
    }
  });

  return message.message;
};
