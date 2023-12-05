## Next JS Web Template

The folder structure is as follows

```
web
 - src
    - app
        - auth
            - forgot-password
            - login
            - signup
        - dashboard
        - example
        - global.css
        - layout.tsx
        - not-found.tsx
        - page.tsx
    - components
        - examples
    - services
    - utils
```

## Before starting

This app was built with Next 14 and Tailwind, there are also a few packages installed for Next 14 examples.

If you're NOT planing to use Tailwind CSS remove all related packages from the package.json file.

```
yarn remove tailwindcss prettier-plugin-tailwindcss tailwind-merge clsx pg use-debounce
```

## Example Folders

The examples folders provide examples for using the NEW apis within Next JS 14

When using this template to create a new project, you should remove the example folders from this app before pushing to git.

The examples include:

- The new App router
  - page.tsx
  - layout.tsx
- Server components
- Data fetching via Server components
- Streaming data to client side components via Suspense
- New Next JS API's like useRouter, useSearchParams, usePathname for navigation and query params
- Custom 404 pages

## Dashboard Folder

The dashboard folder contains a very minimal dashboard example. It is a good starting point for building a dashboard.

## Tests

This Template is making use of Cypress for E2E tests

To run the tests use the following command:

```
npx cypress open
```

This will open the Cypress UI, from there you can run the tests.

If you want to run the tests in headless mode use the following command

```
npx cypress run
```

To write new tests, create a new file within the cypress/e2e folder.
