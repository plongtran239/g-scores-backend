import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const isPrismaUniqueConstrantError = (error: any): error is PrismaClientKnownRequestError => {
  return isPrismaKnownRequestError(error) && error.code === 'P2002';
};

export const isPrismaNotFoundError = (error: any): error is PrismaClientKnownRequestError => {
  return isPrismaKnownRequestError(error) && error.code === 'P2025';
};

const isPrismaKnownRequestError = (error: any): error is PrismaClientKnownRequestError => {
  return error instanceof PrismaClientKnownRequestError;
};
