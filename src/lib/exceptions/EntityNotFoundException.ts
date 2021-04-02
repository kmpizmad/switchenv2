import { Exception } from './Exception';

/**
 * Thrown when an attemp is made to access a file that is not there
 */
export class EntityNotFoundException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
