# Atomic design

Atomic design (Brad Frost) builds interfaces from small parts up, like chemistry: atoms combine into
molecules, molecules into organisms, organisms fill templates, and pages are templates with real data.

| Level        | What it is                                         | Examples                                          | Knows about              |
| ------------ | -------------------------------------------------- | ------------------------------------------------- | ------------------------ |
| **Atom**     | The smallest element, useless alone                | button, input, icon, badge, label                 | tokens only              |
| **Molecule** | A few atoms doing one thing                        | search field (label + input + button), form field | atoms                    |
| **Organism** | A section of a screen                              | user list, header, alarm table                    | molecules, atoms         |
| **Template** | The layout of a screen, without data               | two-column dashboard layout                       | organisms                |
| **Page**     | A template with real data, connected to the stores | users page                                        | everything above, stores |

Two more layers carry the features:

| Layer           | What it is                                           | Knows about |
| --------------- | ---------------------------------------------------- | ----------- |
| **Store**       | The state of a feature (NgRx signal store)           | data-access |
| **Data-access** | The access to the back end (HttpClient, DTO mapping) | —           |
| **Models**      | Shared types (`User`)                                | —           |
| **Utils**       | Pure functions                                       | —           |

## The rule: import downwards only

An atom never imports a molecule; only pages talk to the stores; only data-access talks to the back end. The
`architecture` ESLint block enforces it on every import:

<<< @/../lint/eslint/project/architecture.mjs

## In an Angular library

One folder per layer, one folder per element:

```
src/
  atoms/button/button.component.{ts,html,scss}
  molecules/search-field/…
  organisms/user-list/…
  templates/…
  pages/users-page/…
  stores/users/users.store.ts
  data-access/users/users.api.ts
  models/users/user.ts
  utils/text/format-count.ts
  styles/            tokens, layers, global styles
```

An atom only uses tokens:

<<< @/../examples/design-system/src/atoms/button/button.component.ts

<<< @/../examples/design-system/src/atoms/button/button.component.scss

An organism shows data and emits intents; it never injects a store (a page does), so it stays reusable and
easy to test:

<<< @/../examples/design-system/src/organisms/user-list/user-list.component.ts

The page connects the organisms to the store:

<<< @/../examples/design-system/src/pages/users-page/users-page.component.ts

The store, the only one to call the data-access layer:

<<< @/../examples/design-system/src/stores/users/users.store.ts

## Which level?

- It has no meaning alone and no child component: **atom**.
- It combines atoms for one task, with no business data: **molecule**.
- It is a recognisable section of a screen, receives data through inputs: **organism**.
- It injects a store or a service: **page** (or a store if it holds state).
- In doubt, start lower: splitting an organism later is easy, un-mixing a smart atom is not.

## Storybook

Stories follow the same levels (`Atoms/Button`, `Molecules/SearchField`): atoms and molecules get stories
for every variant; organisms get stories with fake data, which is easy precisely because they do not inject
stores.
