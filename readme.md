# Sort Helper

  ![npm](https://img.shields.io/npm/v/sort-helper)
  ![npm](https://img.shields.io/npm/dt/sort-helper)

`sort-helper` is a micro-library providing some helpers to enhance expressivity when sorting arrays of objects, using the syntax `items.sort(by(column, ...otherColumns))`, with several way to indicate columns:

- By *key*: `persons.sort(by('lastName', 'firstName'))`,
- By *selector*: `dates.sort(by(x => x.toISOString()))`,
- In *descending order*: `[3, 2, 4, 1].sort(by(desc(n => n)))` → `[3, 2, 1, 0]`,
- *Ignoring case*: `['B', 'D', 'c', 'a'].sort(by(ignoreCase(x => x))).join('')` → `'aBcD'`.

This library is conceptually similar to [thenBy](https://github.com/Teun/thenBy.js) *(which I recommend also 👍)*, with these differences:

- An approach more functional than object-oriented *(see `thenBy` fluent API)*,
- A syntax a bit terser and as much readable.
  - When the pipe operator will be supported, the syntax will feel even more natural for `desc` and `ignoreCase` 🎉 : <br>
    `sort(by('releaseDate' |> desc, 'author' |> ignoreCase))`.
- Fully implemented in TypeScript, to benefit from type safety and type expressivity.

> ☝️ **Note** : this is a quick implementation, an advanced *proof of concept*. It may need enhancements regarding edge cases and performance.
