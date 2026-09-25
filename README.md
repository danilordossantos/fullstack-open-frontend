# Bloglist: Frontend

React frontend for **Bloglist**, a full-stack app for sharing and ranking blog posts. Built as part of the [Full Stack Open](https://fullstackopen.com/en/) course by the University of Helsinki.

**Live demo:** https://danilordossantosbloglist.fly.dev (username `demo`, password `demo2026`)

> The full project documentation, including features, architecture, testing, deployment, and the bugs found along the way, lives in the backend repository:
> **[fullstack-open-backend2](https://github.com/danilordossantos/fullstack-open-backend2)**

## Tech stack

- [React 19](https://react.dev/) with [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) for client-side routing
- [Material UI](https://mui.com/) with [Emotion](https://emotion.sh/) for the interface
- [axios](https://axios-http.com/) for API requests
- [Lucide](https://lucide.dev/) icons
- [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/), and jsdom for component tests
- [ESLint](https://eslint.org/)

## Running locally

This app talks to the [backend](https://github.com/danilordossantos/fullstack-open-backend2), which must be running on port `3003`. The Vite development server proxies `/api` requests to it.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create the production build in `dist/` |
| `npm test` | Run the component tests |
| `npm run lint` | Run ESLint |

## Production

In production, this app is not deployed on its own. The backend's `build:ui` script runs `npm run build` here and copies `dist/` into the backend, which serves the React app and the API from the same server on Fly.io.

For the backend script to find this project, clone it next to the backend into a folder named `bloglist-frontend`:

```bash
git clone https://github.com/danilordossantos/fullstack-open-frontend.git bloglist-frontend
```

## Related repositories

- **Backend and main documentation:** [fullstack-open-backend2](https://github.com/danilordossantos/fullstack-open-backend2)
- **End-to-end tests:** [bloglist-e2e](https://github.com/danilordossantos/bloglist-e2e)
