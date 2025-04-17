# MILKAR - Real Estate Collective Website

This is a Next.js project for MILKAR, a collective real estate purchasing platform in Indore that helps buyers get better deals through group purchasing power.

## Features

- **Home Page**: Explains the concept of collective real estate purchasing with simple visuals
- **About Page**: Provides company information and detailed explanation of the process
- **Contact Page**: Form for potential customers to express their property interests
- **Admin Panel**: Simple admin interface to view and export contact form submissions
- **MongoDB Integration**: Store form submissions and manage admin access

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd milkar-website/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Home page
│   │   ├── about/
│   │   │   └── page.tsx              # About page
│   │   ├── contact/
│   │   │   └── page.tsx              # Contact page
│   │   ├── admin/
│   │   │   ├── page.tsx              # Admin dashboard
│   │   │   └── login/
│   │   │       └── page.tsx          # Admin login
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   └── route.ts          # Contact form API
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts      # Auth API
│   │   ├── globals.css
│   │   └── layout.tsx                # Root layout
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components (if used)
│   │   ├── Navbar.tsx                # Navigation bar
│   │   ├── Footer.tsx                # Footer
│   │   └── ContactForm.tsx           # Contact form
│   ├── lib/
│   │   ├── mongodb.ts                # MongoDB connection
│   │   └── utils.ts                  # Utility functions
│   └── models/
│       └── FormEntry.ts              # Form entry model (if using mongoose)
├── public/
│   └── images/
│       ├── logo.svg
│       └── hero.jpg
└── .env.local

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety for JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **MongoDB**: Database for storing form submissions
- **Tailwind CSS**: For styling components

## Key Components

### Home Page
The home page explains MILKAR's concept of collective real estate purchasing with easy-to-understand visuals and clear explanations of benefits for buyers, builders, and MILKAR.

### Contact Form
The contact form collects information from potential buyers including:
- Name, email, and phone
- Property type preferences
- Budget range
- Preferred locations
- Additional requirements

### Admin Panel
A simple admin dashboard to:
- View all form submissions
- Download submissions as CSV
- Simple authentication for admin access

## Customization Guide

### Changing Colors
The primary color scheme is orange-based. You can modify the theme by:
1. Updating color references in components (look for orange-600, etc.)
2. If using shadcn/ui, you can update the colors in the tailwind.config.js file

### Adding New Pages
1. Create a new directory in `src/app/` with the route name
2. Add a `page.tsx` file inside that directory
3. Update the navigation bar to include links to the new page

### Modifying the Contact Form
Edit the `src/components/ContactForm.tsx` file to:
- Add or remove fields 
- Change validation requirements
- Update the form submission handling

## Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel
For the easiest deployment, use Vercel:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Import the project into Vercel
3. Add environment variables in the Vercel dashboard
4. Deploy-website
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Set up MongoDB:
   - Create a MongoDB database (locally or using MongoDB Atlas)
   - Add your MongoDB connection string to the `.env.local` file

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
milkar