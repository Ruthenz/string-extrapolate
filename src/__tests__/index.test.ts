import extrapolate from '../index';

describe('extrapolate', () => {
  it('should return empty object if not given a valid template or an input', () => {
    expect(extrapolate(undefined, undefined)).toEqual({});
    expect(extrapolate('', undefined)).toEqual({});
    expect(extrapolate('', '')).toEqual({});
    expect(extrapolate('   ', '')).toEqual({});
    expect(extrapolate('', '     ')).toEqual({});
  });

  it('should return empty object if a template without proper placeholders is given', () => {
    expect(extrapolate('   ', '     ')).toEqual({});
    expect(extrapolate('asd', 'asd')).toEqual({});
    expect(extrapolate('asd {z', 'xz')).toEqual({});
  });

  it(`should return empty object if a the template doesn't match the input given`, () => {
    expect(extrapolate('a{asd}', 'dsa')).toEqual({});
  });

  it('should return correctly', () => {
    expect(extrapolate('a{asd}', 'acxz')).toEqual({ asd: 'cxz' });
    expect(extrapolate('http://something.com/{id}', 'http://something.com/123123')).toEqual({ id: '123123' });
    expect(extrapolate('{one} with {two} and {three}', 'first with second and third')).toEqual({ one: 'first', two: 'second', three: 'third' });
  });
});
