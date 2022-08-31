import { getPlaceholders, zipObject, replace, replaceTemplatePlaceholders } from '../utils';

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

describe('getPlaceholders', () => {
  describe('regular openers and closers', () => {
    it('should return empty array if there are no placeholders', () => {
      expect(getPlaceholders(undefined)).toEqual([]);
      expect(getPlaceholders('')).toEqual([]);
      expect(getPlaceholders('asd')).toEqual([]);
    });

    it('should return empty array if there are only openers or closers', () => {
      expect(getPlaceholders('{')).toEqual([]);
      expect(getPlaceholders('}')).toEqual([]);
      expect(getPlaceholders('{ad')).toEqual([]);
      expect(getPlaceholders('asd}')).toEqual([]);
    });

    it('should return empty array for a placeholder with nothing in it', () => {
      expect(getPlaceholders('{}')).toEqual([]);
    });

    it('should return correctly', () => {
      expect(getPlaceholders('{asd}')).toEqual([{ start: 0, end: 4, key: 'asd' }]);
      expect(getPlaceholders('a{asd}')).toEqual([{ start: 1, end: 5, key: 'asd' }]);
      expect(getPlaceholders('{[asd]}')).toEqual([{ start: 0, end: 6, key: '[asd]' }]);
      expect(getPlaceholders('What {a} and {b}')).toEqual([{ start: 5, end: 7, key: 'a' }, { start: 13, end: 15, key: 'b' }]);
    });

    it('should return correctly with few closers before openers', () => {
      expect(getPlaceholders('}}{asd}')).toEqual([{ start: 2, end: 6, key: 'asd' }]);
    });

    it('should return correctly with nested openers and closers', () => {
      expect(getPlaceholders('{{asd}}')).toEqual([{ start: 0, end: 6, key: '{asd}' }]);
      expect(getPlaceholders('{{a}')).toEqual([{ start: 0, end: 3, key: '{a' }]);
      expect(getPlaceholders('What {{a} zxc}')).toEqual([{ start: 5, end: 13, key: '{a} zxc' }]);
    });

    it('should return correctly with unclosed openers or closers', () => {
      expect(getPlaceholders('{a}{')).toEqual([{ start: 0, end: 2, key: 'a' }]);
      expect(getPlaceholders('{a}}')).toEqual([{ start: 0, end: 2, key: 'a' }]);
    });
  });

  describe('square bracket opener and closer', () => {
    const config = { opener: '[', closer: ']' };

    it('should return empty array if there are only openers or closers', () => {
      expect(getPlaceholders('[', config)).toEqual([]);
      expect(getPlaceholders(']', config)).toEqual([]);
      expect(getPlaceholders('[ad', config)).toEqual([]);
      expect(getPlaceholders('asd]', config)).toEqual([]);
    });

    it('should return empty array for a placeholder with nothing in it', () => {
      expect(getPlaceholders('[]', config)).toEqual([]);
    });

    it('should return correctly', () => {
      expect(getPlaceholders('[asd]', config)).toEqual([{ start: 0, end: 4, key: 'asd' }]);
    });

    it('should return correctly with nested openers and closers', () => {
      expect(getPlaceholders('[[asd]]', config)).toEqual([{ start: 0, end: 6, key: '[asd]' }]);
      expect(getPlaceholders('[[a]', config)).toEqual([{ start: 0, end: 3, key: '[a' }]);
      expect(getPlaceholders('What [[a] zxc]', config)).toEqual([{ start: 5, end: 13, key: '[a] zxc' }]);
    });
  });

  describe('two char opener and closer - opener = %( , closer = )s', () => {
    const config = { opener: '%(', closer: ')s' };

    it('should return empty array if there are only openers or closers', () => {
      expect(getPlaceholders('%(', config)).toEqual([]);
      expect(getPlaceholders(')s', config)).toEqual([]);
      expect(getPlaceholders('%(ad', config)).toEqual([]);
      expect(getPlaceholders('asd)s', config)).toEqual([]);
    });

    it('should return empty array for a placeholder with nothing in it', () => {
      expect(getPlaceholders('%()s', config)).toEqual([]);
    });

    it('should return correctly', () => {
      expect(getPlaceholders('%(asd)s', config)).toEqual([{ start: 0, end: 6, key: 'asd' }]);
    });

    it('should return correctly with nested openers and closers', () => {
      expect(getPlaceholders('%(%(asd)s)s', config)).toEqual([{ start: 0, end: 10, key: '%(asd)s' }]);
      expect(getPlaceholders('%(%(a)s', config)).toEqual([{ start: 0, end: 6, key: '%(a' }]);
      expect(getPlaceholders('What %(%(a)s zxc)s', config)).toEqual([{ start: 5, end: 17, key: '%(a)s zxc' }]);
    });
  });

  describe('opener = : , closer = /', () => {
    const config = { opener: ':', closer: '/' };

    it('should return correctly', () => {
      expect(getPlaceholders('/asd/:id/', config)).toEqual([{ start: 5, end: 8, key: 'id' }]);
    });
  });
});

describe('replace', () => {
  it(`should return undefined if the parameters aren't valid`, () => {
    expect(replace('a', 'ab', 2)).toBeUndefined();
    expect(replace('a', 'ab', 6)).toBeUndefined();
  });

  it(`should return correctly`, () => {
    expect(replace('aba', 'z', 0)).toEqual('zba');
    expect(replace('aba', 'zzzz', 0)).toEqual('zzzz');
    expect(replace('aba', 'zzzz', 0, 0)).toEqual('zzzzba');
    expect(replace('aba', 'zzzz', 0, 1)).toEqual('zzzza');
    expect(replace('Cool is asd', 'what', 5, 6)).toEqual('Cool what asd');
  });
});

describe('replaceTemplatePlaceholders', () => {
  it(`should return correctly`, () => {
    expect(replaceTemplatePlaceholders('{asd}', [{ start: 0, end: 4, key: 'asd' }], 'REPLACED')).toEqual('REPLACED');
    expect(replaceTemplatePlaceholders('{one} or {two}', [{ start: 0, end: 4, key: 'one' }, { start: 9, end: 13, key: 'two' }], 'REPLACED')).toEqual('REPLACED or REPLACED');
  });
});
