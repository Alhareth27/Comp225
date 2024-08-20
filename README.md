README

Project Overview: 

This project is a React application designed to provide an interactive experience where users can take quizzes, view financial data, and track their progress over time. The application is structured around daily quizzes that align with specific financial graphs and data representations. It also features a countdown timer that shows the time remaining in the day, which helps users know when they can access the next quiz.

Features: 

Daily Quiz: The app provides a quiz each day, featuring financial questions that users can answer. The quiz is automatically updated based on the current day of the week.

Countdown Timer: A real-time countdown timer displays the time remaining until the end of the day, informing users when the next quiz will be available.

Graphical Data Representations: Users can view different types of financial data representations, such as Retained Earnings Tables, Statements of Operations, Income Statements, and Stock Charts.

Scoring System: Users receive scores for each quiz, and the app tracks the last completed day to ensure that users only take each quiz once per day.
Components: 


App.js: The main entry point of the application, managing the overall state and rendering the main UI components.

Quiz Component (/components/Quiz/Quiz.js): Handles the quiz logic and rendering of questions.

TimerScreen Component (/components/TimerScreen/TimerScreen.js): Displays the countdown timer and a start button for the quiz.

Header Component (/containers/Header/Header.js): Displays the header of the application.

FinanceShelf Component (/components/FinanceShelf/FinanceShelf.js): Represents a section dedicated to financial data.

RetEarnTable Component (/components/RetEarn/RetEarnTable.js): Displays a table of retained earnings data.

StmtOpsTable Component (/components/StmtOpsTable/StmtOpsTable.js): Displays a table of statements of operations data.

StockChart Component (/components/StockChart/StockChart.js): Displays a stock chart, using data imported from a CSV file.
