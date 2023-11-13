

## Next JS Web Template

The folder structure is as follows
```
web 
 - src
    - app
        - dashboard
        - example
    - components
        - examples
    - global.css
    - layout.tsx
    - not-found.tsx
    - page.tsx
```

## Before starting

This app was built with Next 14 and Tailwind, there are also a few packages installed for Next 14 examples.

If you're not planing to use Tailwind CSS and or Postgres remove these packages from the package.json file.

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
