import { customAlphabet } from 'nanoid';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Custom helper function form nanoid, used for generating random strings with custom alphabet.
 * When using custom alphabet the collision is increased
 * This is the results from https://zelark.github.io/nano-id-cc/
 *    10: 129M IDs needed, in order to have a 1% probability of at least one collision.
 *    9:  16M IDs needed, in order to have a 1% probability of at least one collision.
 *    8:  2M IDs needed, in order to have a 1% probability of at least one collision.
 *    7:  266K IDs needed, in order to have a 1% probability of at least one collision.
 */
const createRandomString = customAlphabet(alphabet, 7);

/**
 * Generate random string with default length
 *  @returns Unique string.
 */
export const createTinyUrlString = (): string => {
  return createRandomString();
};
