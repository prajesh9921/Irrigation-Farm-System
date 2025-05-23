# Farm Irrigation System

The **Farm Irrigation System** is an irrigation scheduling system designed to manage and monitor irrigation cycles for different plots. It provides features like filtering, pagination, and real-time status updates.

---

### Deployed Link

Live link: https://irrigationfarmsystem.netlify.app/

## Getting Started

Follow these steps to run the application locally:

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/prajesh9921/Irrigation-Farm-System.git

2. Install Dependencies:
   ```bash
   npm install
   # or
   yarn install

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start

### File Structure

```
src/
├── components/
│   ├── Header.tsx
|   ├── IrrigationForm.tsx
|   ├── IrrigationSchedule.tsx
│   ├── irrigation/
│   │   ├── ScheduleHeader.tsx
│   │   ├── ScheduleFilters.tsx
│   │   ├── ScheduleTable.tsx
│   │   ├── EmptySchedule.tsx
│   │   ├── useCycleSimulation.ts
│   │   ├── useScheduleFiltering.ts
│   │   ├── formContent.tsx
│   │   ├── formField.tsx
│   │   ├── formHeader.tsx
│   │   ├── statusChip.tsx
│   │   ├── SubmitButton.tsx
│   │   ├── TimeField.tsx
│   │   ├── TimeFieldGroup.tsx
├── types/
│   └── irrigation.ts
├── hooks/
│   └── useIrrigationForm.ts
├── pages/
    └── Index.tsx
    └── NotFound.tsx
```

### Key Files and Their Purpose

```IrrigationSchedule.tsx```
The main component that manages and displays the irrigation schedule. Combines filtering, pagination, and real-time status updates.

```irrigation/ScheduleHeader.tsx```
Displays the total number of irrigation cycles and the count of filtered cycles

```irrigation/ScheduleFilters.tsx```
Provides filtering options for plots, status, and search terms

```irrigation/ScheduleTable.tsx```
Displays the irrigation cycles in a tabular format.

```irrigation/EmptySchedule.tsx```
Displays a message when no irrigation cycles are available.

```irrigation/useCycleSimulation.ts```
A custom hook that simulates real-time updates to the status of irrigation cycles.

```irrigation/useScheduleFiltering.ts```
A custom hook that handles filtering, searching, and pagination logic.

```pages/index.tsx```
Contains the staring code of the application

```app.tsx```
Contains all the routing related code.

### Images
![Screenshot 2025-05-11 191807](https://github.com/user-attachments/assets/eea59acf-5b93-4e8f-baab-19b8e1ebd3af)
![Screenshot 2025-05-11 191845](https://github.com/user-attachments/assets/fc95a92c-c22d-42f8-9108-64c8782c7c90)
