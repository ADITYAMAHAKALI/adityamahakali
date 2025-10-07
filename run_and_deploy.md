# Running and Deploying the Application

This document provides instructions on how to run the project locally and how to deploy it to a production environment.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [pnpm](https://pnpm.io/installation)

## Running Locally

1.  **Install Dependencies:**
    Open your terminal, navigate to the project's root directory, and run the following command to install the necessary dependencies:
    ```bash
    pnpm install
    ```

2.  **Start the Development Server:**
    Once the dependencies are installed, you can start the local development server with this command:
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

## Building for Production

To create an optimized production build of the application, run the following command:
```bash
pnpm build
```
This will generate a `.next` directory with the production-ready build files.

## Deployment

This Next.js application is configured for easy deployment on platforms like Vercel or Netlify.

### Deploying with Vercel

1.  Push your code to a Git repository (e.g., GitHub, GitLab, Bitbucket).
2.  Go to the [Vercel dashboard](https://vercel.com/new) and import your Git repository.
3.  Vercel will automatically detect that this is a Next.js project and configure the build settings for you.
4.  Click "Deploy" to build and deploy your application. Any subsequent pushes to your main branch will trigger automatic redeployments.