# Study Nest
Study Nest is a website that lets you create, customize, join, leave, delete, and search for study groups. To create a group, you must provide information about your group including name, course, subject, meeting days, and meeting time. After creating a group, you have the ability to delete it, and after joining a group, you have the ability to leave it. Your home page is personalized to you; it shows the groups that you have created and the groups that you have joined. For each group, you can view additional details such as creator, group members, and maximum group size. If you're part of a group, you can also view and add resources that all group members can see. Furthermore, you can view all groups, search for specific groups, and sort groups according to various attributes.

## Getting the code
Clone the repository with `git clone https://github.com/vishaka-b/study-nest.git`. Enter the study-nest directory with `cd study-nest`. Enter the frontend folder with `cd frontend`. Use `npm install` or `npm i` to install the required npm features.

## Connecting to the backend database
We are using MongoDB atlas to run our database. Make sure that you have a folder called backend after the cloning from the steps above. Enter the backend folder using `cd backend`. To start the connection, first install mondodb, express, cors, mongoose, and body-parse with the following commands:
- `npm install mongodb`
- `npm install express`
- `npm install cors`
- `npm install mongoose`
- `npm install body-parser`

Then, start the backend and connect to the database by running `node index.js`. You should see "Succesfully connected to MongoDB" in your terminal if you have followed the above steps.

Our backend will try to connect on (http://localhost:8888/). If you get an error saying port 8888 is already in use, change the code in index.js in the backend to an unused port in your server (e.g., 1234). Make sure to change links from http://localhost:8888/ to http://localhost:1234/ in the frontend files home.js, allgroups.js, Login.js, and SignUp.js to ensure the data are read from the correct places.

## Setting up and running the frontend
Enter the frontend folder using `cd ../frontend`. Before running the code for the first time, make sure to install React Bootstrap and Axios with the following commands:
- `npm install react-bootstrap bootstrap`
- `npm install axios`

Make sure you are connected to MongoDB before running the following steps (you should see "Succesfully connected to MongoDB" in the terminal).
Run `npm start` in the frontend folder to run Study Nest on http://localhost:8888/.

Have fun! :)

## Creators
Study Nest is brought to you by:
Maheswari Bajji [https://github.com/mbajji]
Vishaka Bhat [https://github.com/vishaka-b]
Shriya Char [https://github.com/Shriya8]
Joy Cheng [https://github.com/joy-y-cheng]
Hannah Kendall [https://github.com/hannahkendall04]