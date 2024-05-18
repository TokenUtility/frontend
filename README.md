This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the development server directly:

```bash
npm i
# or
yarn

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Run the deplopment server with docker

```bash
docker build . -t tokenimg
docker run -p 3000:3000 --rm --name tokenu-tility tokenimg
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
