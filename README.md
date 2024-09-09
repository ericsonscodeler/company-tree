# Application Overview
This application is designed to facilitate efficient asset management and maintenance in industries, providing a visual representation of an asset hierarchy.

## Features
1. Asset Page
    The core feature of the application is the Asset Tree, which visually represents the company's asset hierarchy in a dynamic tree structure.

2. Sub-Features
    A dynamic tree displays the relationships between components, assets, and locations in the company’s asset hierarchy.

3. Filters:

    Text Search:
    Users can search for specific components, assets, or locations within the tree.
    Energy Sensors Filter:
    Filters the tree to display only energy sensors, providing a focused view.
    Critical Sensor Status Filter:
    Highlights assets with critical sensor status for immediate attention.


## Tech Stack

- **React**
- **React Query**
- **React Router**
- **TypeScript**
- **TailwindCSS**

## Project Structure

```
├── src/
│   ├── assets/               # Static assets (images, logos, etc.)
│   ├── components/           # Reusable UI components
│   ├── pages/                # Application pages (Home, Company, etc.)
│   ├── types/                # TypeScript types used across the app
│   ├── App.tsx               # Main entry component
│   └── index.tsx             # React entry point
├── README.md                 # Project documentation
├── package.json              # Project dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## Installation and Setup

1. **Clone the Repository**:
    ```
    https://github.com/ericsonscodeler/company-tree.git
    cd company-tree
    ```

2. **Install Dependencies**:
    ```
    npm install
    ```

3. **Start the Application**:
    ```
    npm run dev
    ```

4. **View in Browser**:
    Open your browser and go to `http://localhost:5173/` to view the app.

## API Setup

The project uses a fake API to retrieve company data. You can adjust the API endpoint as needed. The current API URL is:

```
http://fake-api.tractian.com/companies
```