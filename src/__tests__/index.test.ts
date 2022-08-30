import extrapolate from '../index';

describe('extrapolate', () => {
  it('should return nothing if not given string or template', () => {
    expect(extrapolate(undefined, undefined)).toBeUndefined();
    expect(extrapolate('', undefined)).toBeUndefined();
    expect(extrapolate('', '')).toBeUndefined();
  });
});
