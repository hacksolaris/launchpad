![image](https://github.com/user-attachments/assets/70173859-6e9f-4e24-99fb-e4f28c4a1d35)

# Launchpad

**⚠️ WIP ⚠️**

This project is the backbone of the Solaris Hackathon, designed to provide participants with on-demand, free AWS compute instances. Our goal is to empower our hackers to build, innovate, and experiment without the barrier of infrastructure costs or complex cloud setup during the hackathon.

This monorepo contains the frontend web application and the backend API that powers Launchpad.

## Core Mission

Solaris Launchpad aims to:

1. Provide a simple, intuitive web interface for hackathon participants to manage temporary AWS EC2 instances (and more).
2. Offer a backend API to securely and efficiently handle the provisioning, monitoring, and de-provisioning of these instances.
3. Streamline the development and deployment process for hackathon organizers and contributors

## Tech Stack

This project leverages a modern and robust tech stack:

- [Turborepo](https://turbo.build) - Monorepo Management
- [Bun](https://bun.sh/) - Package Manager
- Frontend (`apps/web`)
  - [Next.js](https://nextjs.org/) 15 (with Turbopack for development)
  - TypeScript
  - Tailwind
  - [shadcn/ui](https://ui.shadcn.com/)
- Backend (`apps/api`)
  - [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet)
  - C#
  - .NET 9
  - OpenAPI (Swagger) for docs
- Tooling
  - ESLint for linting
  - Prettier for formatting

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/): Version 18 or newer
- [Bun](https://bun.sh/docs/installation): Version 1.2.13 or compatible
- [.NET SDK](https://dotnet.microsoft.com/download): Version 9.0.x (specifically `net9.0` as targeted by the API project)

### Setup Instructions

1. Clone the repository

```bash
git clone git@github.com:hacksolaris/launchpad.git launchpad
cd launchpad
```

2. Install dependencies

```bash
# Navigate to the root of the project and run:
bun install
```

3. Environment Variables
   - Frontend
     - Copy all of the entries from `.env.local.example` and then replace it with the respective environment variables. Make sure the file with the environment variables on the frontend is called `.env.local` not `.env.local.example`
   - Backend
     - The .NET API uses `appsettings.json` for general configuration and `appsettings.Development.json` for dev related settings. For any sensitive information like AWS creds, it's recommended to rename the `.env.example` file to `.env` and then fill in all the environment variables

### Running the Project

Turborepo is configured to manage the deployment and build processes for both the frontend and the backend.

1. Run both frontend and backend at the same time (Recommended for Development):

```bash
# In the root directory of the project
bun dev
```

2. Run applications individually

```bash
# Web app
cd apps/web
bun dev

# API
cd apps/api
bun dev
```
