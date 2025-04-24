# Modern React State Management

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)  
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)  
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![MSW](https://img.shields.io/badge/MSW-FF6B6B?style=for-the-badge&logo=mock-service-worker&logoColor=white)

## Overview

Exploring client and server state management in modern React applications.

This project aims to experiment with the latest state management techniques in React. Using "Thomann" (an online music instruments store) as inspiration, I built a demo e-commerce application with core shopping features.

## Project Goals

- Recreate a basic online marketplace for musical instruments
- Implement multi-category product filtering
- Enable shopping cart functionality (add/remove items)
- Display detailed product information

## Technical Achievements

### State Management

- Managed client state with Zustand
- Handled server state with React-Query (TanStack Query)

### Performance Optimizations

- Implemented infinite scrolling for product lists
- Applied memoization to improve rendering performance
- Utilized lazy loading where appropriate
- Implemented API prefetching

### UI/UX

- Developed a responsive, user-friendly interface
- Created realistic shopping interactions
- Implemented multiple filtering and sorting options

### Infrastructure

- Built from scratch without frameworks (Vite + React SPA)
- Developed a mock backend API using MSW

![Alt text](./docs/Capture%201.gif)

![Alt text](./docs/Capture%202.gif)

## Technology Stack

- **Core:** React, TypeScript
- **State Management:** Zustand, React-Query
- **Routing:** React-router-dom
- **Styling:** Tailwind CSS
- **Icons:** FontAwesome
- **API Mocking:** MSW

## Installation

- Clone the repo.
- `npm install`
- `npm run dev`
