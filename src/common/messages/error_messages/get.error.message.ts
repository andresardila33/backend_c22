import { ErrorMsg } from '../../interfaces';

export const getErrorMessage = (code: string): string => {
  const errorMessages: ErrorMsg[] = [
    {
      code: 'E001',
      message: `The product with id: "&" not found`,
    },
  ];

  const message: ErrorMsg = errorMessages.find((element) => {
    if (element.code === code) {
      return element;
    }
  });

  return message.message;
};
