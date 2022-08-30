import { removeFirstAndLastChars, zipObject } from '../utils';

describe('zipObject', () => {
  it(`should return undefined if the parameters aren't valid`, () => {
    expect(zipObject(undefined, undefined)).toBeUndefined();
    expect(zipObject(undefined, [])).toBeUndefined();
    expect(zipObject([], undefined)).toBeUndefined();
    expect(zipObject(['a'], [])).toBeUndefined();
    expect(zipObject(['a'], ['b', 'b'])).toBeUndefined();
  });

  it('should return empty object with two empty arrays', () => {
    expect(zipObject([], [])).toEqual({});
  });

  it('should return correctly', () => {
    expect(zipObject(['a'], [1])).toEqual({ 'a': 1 });
    expect(zipObject(['a', 'b', 'c'], ['a', 'b', 'c'])).toEqual({ 'a': 'a', 'b': 'b', 'c': 'c' });
  });
});

describe('removeFastAndLastChars', () => {
  it('should return undefined if nothing is sent', () => {
    expect(removeFirstAndLastChars(undefined)).toBeUndefined();
  });

  it('should return empty string if string length is under 2', () => {
    expect(removeFirstAndLastChars('')).toEqual('');
    expect(removeFirstAndLastChars('a')).toEqual('');
    expect(removeFirstAndLastChars('aa')).toEqual('');
  });

  it('should return correctly for any other string', () => {
    expect(removeFirstAndLastChars('aba')).toEqual('b');
    expect(removeFirstAndLastChars('{id}')).toEqual('id');
    expect(removeFirstAndLastChars('zxcdfds')).toEqual('xcdfd');
  });
});

