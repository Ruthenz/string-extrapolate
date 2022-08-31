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
    expect(extrapolate('My name is {name}', 'My nam is guy')).toEqual({});
  });

  it('should return correctly', () => {
    expect(extrapolate('a{asd}', 'acxz')).toEqual({ asd: 'cxz' });
    expect(extrapolate('http://something.com/{id}', 'http://something.com/123123')).toEqual({ id: '123123' });
    expect(extrapolate('My name is {name}', 'My name is guy')).toEqual({ name: 'guy' });
    expect(extrapolate('{one} with {two} and {three}', 'first with second and third')).toEqual({ one: 'first', two: 'second', three: 'third' });
  });

  it('should return correctly when nested curly braces', () => {
    expect(extrapolate('a{{asd}}', 'azxc')).toEqual({ '{asd}': 'zxc' });
    expect(extrapolate('a{{{asd}}}', 'azxc')).toEqual({ '{{asd}}': 'zxc' });
  });

  it('should return correctly when using different opener and closer', () => {
    expect(extrapolate('Test [test]', 'Test one', { opener: '[', closer: ']' })).toEqual({ 'test': 'one' });
    expect(extrapolate('Test %(test)s', 'Test second', { opener: '%(', closer: ')s' })).toEqual({ 'test': 'second' });
  });
});
