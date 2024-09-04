# Ecoworks Monitoring System

Ecoworks is a small community garden based in St Ann's Nottingham: [http://www.ecoworks.org.uk/](http://www.ecoworks.org.uk/)

This open source project provides access to the monitoring system that Ecoworks use to track visitors to the space and daily checks, for compliance and reporting purposes.

## Purpose

This repository holds the code for a custom built data monitoring system, designed to support data collection (and evidencing) for small charities.

The system has 3 key functions:

1. Registration of users - Collect limited information about any users of the Charity space
2. Daily checks - The ability for staff to complete a daily checklist when on site, showing key checks have been performed
3. Register - Keep track of who has been on site and on which days

## The data warehouse

Rather than using an in-built database, this app leverages the power of Google Sheets for data storage. Google Sheets is a robust and free solution for data management and its use in this application enables non-technical members of the team to access important data and more importantly, download and leverage that data for core reporting.

This is extremely important for annual reporting to the charity commission, to provide accurate and up-to-date information on the number of service user and volunteers.

## Getting Started

The project is built with `NextJS (TS)` and uses `yarn`. To run the development server:

```bash
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.