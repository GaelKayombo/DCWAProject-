# DCWAProject-
Overview
This project is a Data Centric Web Application built using Node.js, Express, MySQL, and MongoDB.
It displays data from both relational and non-relational databases through simple web pages.


Features
Home Page with navigation to each section.
Students Page = Lists students from MySQL.
Lecturers Page = Lists lecturers from MongoDB.
Grades Page = Displays student grades from MySQL.
Departments Page = Lists department details from MySQL.
Basic styling for cleaner layout and easy navigation.


Tech Stack
Backend: Node.js, Express
atabases: MySQL & MongoDB
Styling: Inline CSS
Other Tools: Nodemon, dotenv


How to Run
Clone this repository.

Install dependencies:
npm install


Set up your .env file in the project root:
PORT=3004
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DB=proj2024mysql
MONGO_URI=mongodb://127.0.0.1:27017/proj2024MongoDB

Start the server:
npx nodemon server.js
Open your browser at:
http://localhost:3004


Innovation
Added simple custom styling for a cleaner look and easier navigation.



