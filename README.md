# Expense Tracker

## Overview

Expense Tracker is a web application built with React that allows users to track their expenses. Users can add, edit, and delete expenses, and the application will display the total amount spent. The application also provides sorting and filtering features to help users analyze their spending habits.

## Features

- **Add Expense**: Users can add new expenses with details such as name, amount, date, and description.
- **Edit Expense**: Users can modify existing expenses.
- **Delete Expense**: Users can remove expenses.
- **Sort Expenses**: Users can sort expenses by date or amount.
- **Filter Expenses**: Users can filter expenses by a date range.
- **Total Spent**: The application calculates and displays the total amount spent.

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/DivyanshuLohani/expense-tracker.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd expense-tracker
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

4. **Start the development server**:
    ```sh
    npm start
    ```

The application will be available at `http://localhost:3000`.

## Usage

1. **Add a new expense**:
    - Click on the "Add Expense" button.
    - Fill in the details (name, amount, date, description) in the form.
    - Click "Save" to add the expense.

2. **Edit an existing expense**:
    - Click on the "Edit" button next to the expense you want to modify.
    - Update the details in the form.
    - Click "Save" to save the changes.

3. **Delete an expense**:
    - Click on the "Delete" button next to the expense you want to remove.

4. **Sort expenses**:
    - Use the sort dropdown to select "Date" or "Amount".

5. **Filter expenses**:
    - Use the filter inputs to set a start date and an end date.
    - The expenses list will update to show only expenses within the specified date range.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **useReducer**: React hook for managing complex state logic.
- **useState**: React hook for managing local component state.
- **useEffect**: React hook for performing side effects in function components.
- **useTransition**: React hook for managing UI transitions.
