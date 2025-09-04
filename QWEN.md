# E-book IA no Agronegócio - Project Context

## Project Overview

This is a Next.js 15 application for a landing page to distribute a free e-book on the application of Artificial Intelligence in Agribusiness. The main features include a registration form for users to provide their name, email, and WhatsApp number to receive the e-book via email, powered by Resend. The site has a responsive design and supports light/dark themes with a preference for dark mode.

## Key Technologies

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Email Service**: Resend
- **TypeScript**: Used throughout the project
- **UI Components**: Radix UI, shadcn/ui inspired components
- **Theme Management**: next-themes
- **Form Handling**: react-hook-form

## Project Structure

- `/app`: Contains the main application pages and API routes.
  - `/api/send-ebook`: API endpoint to handle e-book delivery via email.
- `/components`: Reusable UI components.
- `/context`: Providers for global state, especially theme management.
- `/lib`: Utility functions and helpers.
- `/public`: Static assets like images and the e-book PDF.
- `/styles`: Global styles and Tailwind configuration.

## Development Workflow

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file with the following variable:

```txt
# .env.local
RESEND_API_KEY="" # Get it at https://resend.com/
```

### Running the Development Server

```bash
npm run dev
```

This starts the development server at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

### Running Tests

There are no explicit testing commands mentioned in the package.json scripts. Testing practices are not defined in this project.

## Deployment

This project can be easily deployed on Vercel or any platform that supports Next.js.

## Key Implementation Details

1.  **Landing Page (`/app/page.tsx`)**: The main page presents the e-book offer and contains the registration form (`EbookForm`).
2.  **Registration Form (`/components/ebook-form/index.tsx`)**: A client-side component that collects user data (name, email, WhatsApp) and submits it to the API endpoint.
3.  **Email API (`/app/api/send-ebook/route.tsx`)**: A Next.js API route that uses the Resend SDK to send the e-book PDF as an attachment to the user's email. It logs the registration data to the console.
4.  **Theme Management (`/context/index.tsx`)**: Uses `next-themes` to provide dark/light mode support.
5.  **Styling (`tailwind.config.ts`)**: Extensive Tailwind configuration for custom colors and typography.
