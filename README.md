# ITD Global Upsell Opportunity Analyzer

A web-based demo that simulates analyzing ITD Global's customer data to identify high-potential upselling opportunities, aligned with the new Group CRO's focus on generating more revenue from current customers.

## Features

- Data Upload Interface with sample data loading
- Customer Opportunity Dashboard showing top upsell opportunities
- Filtering and Sorting Controls for data analysis
- Visualizations including bar charts and pie charts
- Detailed view for each opportunity

## Technology Stack

- React with Vite
- Tailwind CSS for styling
- Chart.js for data visualization
- Sentry for error tracking

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

## Environment Variables

The application requires several environment variables to be set:

```
VITE_PUBLIC_APP_ID=
VITE_PUBLIC_APP_ENV=
VITE_PUBLIC_SENTRY_DSN=
VITE_PUBLIC_UMAMI_WEBSITE_ID=
```

## Build and Deployment

To build the application for production:

```
npm run build
```

The application is deployed using Vercel.

## Demo Notes

This demo uses static sample data. A production version would analyze actual customer shipping patterns, compare against industry benchmarks, and generate tailored recommendations. No customer data is used in this demonstration.