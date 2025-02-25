## About the Brandboost.ai project:

# Brandboost.ai

Brandboost.ai is an AI-powered platform designed to help users manage their brands effectively with advanced tools and insights. The project is built with Next.js and integrates with Clerk for authentication, Neon for PostgreSQL database hosting, and Radix UI for a component library. It leverages Tailwind CSS for styling, TypeScript for type safety, and Drizzle ORM for database interactions.

## Features

- **User Authentication**: Sign-in and sign-up functionalities powered by [Clerk](https://clerk.dev).
- **AI Integration**: Provides intelligent brand management tools and insights.
- **Responsive UI**: Built with [Radix UI](https://www.radix-ui.com/) components for a polished user experience.
- **Database**: Utilizes PostgreSQL with the Neon serverless database.
- **Next.js**: Full-stack application built using [Next.js](https://nextjs.org).
- **Tailwind CSS**: Styling framework for responsive, utility-first design.
- **Drizzle ORM**: For efficient interactions with the PostgreSQL database.
- **Enhanced Analytics**: New features for analyzing social media performance and customer sentiment.

## Getting Started

To get started with this project, you'll need to have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/))

### Install Dependencies

First, clone the repository and install the required dependencies:

```bash
git clone https://github.com/{repository}/brandboost-ai.git
cd brandboost-ai
npm install
```

### Set up Environment Variables

Create a `.env.local` file in the root of the project and add the following:

```bash
NEXT_PUBLIC_DATABASE_CONNECTION_STRING= [Enter your string here from your Neon database]
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= [Enter your key]
CLERK_SECRET_KEY= [Enter your key]
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Running the Development Server

To run the app locally in development mode, use:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page will auto-update as you edit the files.

## Project Structure

The project is structured as follows:

```
.
├── app/                     # Next.js application files
├── components/              # Reusable components
├── styles/                  # Global CSS and Tailwind 
├── .env.local               # Environment variables 
├── package.json             # Project dependencies and scripts
└── tailwind.config.js       # Tailwind CSS configuration
```

## Technologies Used

- Next.js: A React-based framework for building full-stack applications.
- Clerk: Authentication service for secure sign-in and sign-up.
- PostgreSQL: Relational database for storing brand data.
- Neon: Serverless database hosting for PostgreSQL.
- Radix UI: Low-level UI component library for React.
- Tailwind CSS: Utility-first CSS framework for styling.
- TypeScript: Type-safe JavaScript for better developer experience.
- Drizzle ORM: A lightweight ORM for interacting with the PostgreSQL database.

## Learn More

To learn more about Next.js, take a look at the following resources:

- Next.js Documentation - learn about Next.js features and API.
- Learn Next.js - an interactive Next.js tutorial.
- You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js. Check out our Next.js deployment documentation for more information. 