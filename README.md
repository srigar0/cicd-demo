# CI/CD Express demo

Minimal Node/Express application used to demonstrate CI with GitHub Actions and Docker deployment to Render.

## Requirements

- Node.js 22.13 or later (Node 22.x)
- npm and internet access for the initial package installation
- Docker for the optional local container demonstration

## First-time setup

```bash
npm install
npm run lint
npm test
npm start
```

**Important:** Run `npm install` once and commit the resulting **`package-lock.json`** to Git. This source archive deliberately does not contain a lockfile because the creation environment could not access the npm registry. CI and Docker builds use `npm ci` and therefore require that committed lockfile. Do not commit `node_modules/`.

The server listens on the `PORT` environment variable if provided, or port 3000 otherwise. It binds to `0.0.0.0` to accept traffic forwarded by Docker or Render.

## Endpoints

| Route | HTTP response |
| --- | --- |
| `GET /` | `200` and `{ "message": "Hello from Render!" }` |
| `GET /health` | `200` and `{ "status": "ok" }` |
| Other paths | `404` |

## Local browser / curl checks

```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/health
```

Stop the local Node process before starting Docker on host port 3000.

## Local Docker check

After creating `package-lock.json` as described above:

```bash
docker build -t cicd-express-demo .
docker run --rm -p 127.0.0.1:3000:3000 cicd-express-demo
```

Visit http://localhost:3000/health in a second terminal or browser.

The `Dockerfile` uses `npm ci --omit=dev`, installing runtime packages but not Mocha, Supertest, or ESLint into the production image. Tests run *before* deployment in the CI workflow developed during the lecture.

## Next lecture stages

1. Add `.github/workflows/ci.yml` in class; run `npm ci`, `npm run lint`, and `npm test` for pushes and pull requests.
2. In Render, create a Web Service from this repository, choose **Docker**, and use `/health` for the health check.
3. Set Render auto-deploy to **After CI Checks Pass** for the production branch, and demonstrate a failed test followed by a fix.

The GitHub Actions workflow is intentionally **not** included in the starter. It will be created incrementally during the live demo.

