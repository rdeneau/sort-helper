import { by, desc, ignoreCase } from './sort-helper';

describe('SortHelper', () => {
  const numbers  = [3, 2, 4, 1];
  const expected = [1, 2, 3, 4];

  describe('by', () => {
    const toItem = (i: number) => ({
      id: i,
      label: `label#${i}`,
      date: new Date(2020, 5, i),
    });

    const items = numbers.map(toItem);

    type ItemKey = keyof (ReturnType<typeof toItem>);

    [ { key: 'id' as ItemKey, type: 'number' }
    , { key: 'date' as ItemKey, type: 'Date' }
    , { key: 'label' as ItemKey, type: 'string' }
    ].forEach(({ key, type }) => {
      it(`should sort by the given key (${key}: ${type})`, () =>{
        const result = items.sort(by(key));
        const actual = result.map(x => x.id);
        expect(actual).toEqual(expected);
      });
    });

    it(`should sort using the given selector`, () => {
      const result = numbers.sort(by(n => `label#${n}`));
      expect(result).toEqual(expected);
    });

    it(`should sort using the given selectors`, () => {
      const dates = [
        /* #0 */ new Date(2002, 5, 1),
        /* #1 */ new Date(2000, 5, 1),
        /* #2 */ new Date(2002, 3, 1),
        /* #3 */ new Date(2001, 1, 25),
        /* #4 */ new Date(2001, 1, 1),
      ];
      const expectedDates = [1, 4, 3, 2, 0].map(i => dates[i]);
      const result = dates.sort(by(x => x.toISOString()));
      expect(result).toEqual(expectedDates);
    });

    it(`should sort using the multiple columns`, () => {
      const persons = [
        { id: 1, lastName: 'Doe', firstName: 'William' },
        { id: 2, lastName: 'Foo', firstName: 'Bar' },
        { id: 3, lastName: 'Doe', firstName: 'John' },
        { id: 4, lastName: 'Baz', firstName: 'Camille' },
      ];
      const result = persons.sort(by('lastName', 'firstName'));

      const actualIds = result.map(x => x.id);
      const expectedIds = [4, 3, 1, 2];
      expect(actualIds).toEqual(expectedIds);
    });
  });

  describe('desc', () => {
    it(`should reverse order`, () => {
      const result = numbers.sort(by(desc(n => n)));
      const actual = result.reverse();
      expect(actual).toEqual(expected);
    });
  });

  describe('ignoreCase', () => {
    it(`should reverse order`, () => {
      const result = ['B', 'D', 'c', 'a'].sort(by(ignoreCase(x => x)));
      const actual = result.join('');
      expect(actual).toEqual('aBcD');
    });
  });
});
