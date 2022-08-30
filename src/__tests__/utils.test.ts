import { zipObject } from '../utils';

describe('zipObject', () => {
  it('should return empty object with two empty arrays', () => {
    expect(zipObject([], [])).toEqual({});
  });
});
