This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Command to SetUp >< Step by step

### 1. Clerk Setup
[https://clerk.com/docs/quickstarts/nextjs](https://clerk.com/docs/quickstarts/nextjs)
follow all of instruction from this site!

### 2. Shadcn UI setup
1. npx shadcn-ui@latest init
- choose menu : New York, Slate
2. npx shadcn-ui@latest add
- then press "A" and than "Enter"

### 3. Shadcn UI Theme
[https://ui.shadcn.com/docs/dark-mode/next](https://ui.shadcn.com/docs/dark-mode/next)
1. npm install next-themes
2. Copy code from shadcn thame

### 4. Prisma
1. npm install prisma --save-dev
2. npx prisma init 
3. Then Build Relationan in schema.prisma and Setup .env
4. npx prisma migrate dev 
   ? Enter a name for the new migration: » init db
5. npx prisma studio
   open http://localhost:5555/ you'll see something like django admin

### 5. Table
1. npm i @tanstack/react-table
2. more information : [https://tanstack.com/table/v8/docs/guide/data](https://tanstack.com/table/v8/docs/guide/data)

### 6. React Icon - Use for styling icon
1. npm i react-icons

### 7. Text Area - Use React Quill
1. npm install react-quill


## Getting Starteds

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
"# invitation" 
