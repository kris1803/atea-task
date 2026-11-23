# Subscription Dashboard SPA

## Setup

Requirements: Node.js, Yarn

1. Clone the repository
2. Run `yarn install` to install dependencies
3. Run `yarn dev` to start the development server

## Architecture

React and Vite were used to build the SPA. The application is structured in a feature-based architecture, where each feature has its own folder containing all the necessary files (components, hooks, services, etc.). This approach allows for better organization and scalability of the codebase. React Compiler was used to reduce boilerplate of useMemo and useCallback. The application uses React Router for routing.

## Auth

Hardcoded user credentials are used for authentication. They can be found in allowedUsers array in [src/lib/fakeApi.ts](src/lib/fakeApi.ts).

## Internationalization

Translations were not added because of the time constraints.

## Styling

No styling libraries were used. The styling was done using CSS, but any UI/styling library could be used for a production-ready application.

## Testing

No testing has been added because of the time constraints. However, testing is an important aspect of software development and should be considered in a production-ready application.

## Trade-offs

Money in a real production app should be in cents, not in euros. However, for the sake of simplicity, money is represented in euros in this application.
