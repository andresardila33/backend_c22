import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

const logger = new Logger();

export const handleDbExceptions = (error: any) => {
  if (
    error instanceof PrismaClientRustPanicError ||
    error instanceof PrismaClientValidationError ||
    error instanceof PrismaClientKnownRequestError ||
    error instanceof PrismaClientUnknownRequestError ||
    error instanceof PrismaClientInitializationError
  ) {
    const { message, ...rest } = error;
    //const errorMsg = getErrorDbMessage(code);
    const errorMessage = {
      type: 'Error',
      message: message,
      rest,
    };
    logger.error(JSON.stringify(errorMessage));
    throw new BadRequestException(errorMessage);
  } else {
    logger.error(error.message);
    throw new InternalServerErrorException(error.message);
  }
};
