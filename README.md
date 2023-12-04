# Study Nest
Study Nest is a website that lets you join and create groups. Joinned groups have more information about time, creator, class/subject and members of the group. Members of groups can leave or delete groups if they are the owner. Each group also has a resource page to access different notes. 
Home page is personalized to you, groups are personalized based on subject and the allgroups page lets you search for groups to join and sort by different groups. 

## Getting the Code
1) Clone the repository
  `git clone https://github.com/vishaka-b/study-nest.git`
2) cd into study-nest
   `cd study-nest`
3) go into the frontend folder using `cd frontend`
4) use `npm install` or `npm i` to install the required npm features

## Connecting to Backend Database
We are using MongoDB atlas to run our database. 
Make sure that you have a folder called backend after the cloning from the steps above. 

cd into the folder using `cd backend`

To start the connection first install mondodb, express, cors, mongoose and body-parse.
To do that use:

`npm install mongodb`
`npm install express`
`npm install cors`
`npm install mongoose`
`npm install body-parser`

Then to start the backend and successfully connect to the data base run: `node index.js`
You will see Succesfully connected to MongoDB in your terminal if you have followed the above steps.

Our backend will try to connect on (http://localhost:8888/). If you get an error saying port 8888 is already in use, change the code in index.js in the backend to be another unused port in your server (ex: 50000)
Make sure to change the link from http://localhost:8888/ to http://localhost:5000/ in the frontend home.js and allgroups.js pages as well under the folder Pages to ensure the data is read from the correct link.

## Installations
In the frontend folder make sure to install these before running the code for the first time:
Install React Bootstrap by running `npm install react-bootstrap bootstrap`.
Install Axios by running `npm install axios`

## Running the FrontEnd
Make sure you are connected to MongoDB before running these steps (you should see Succesfully connected to MongoDB in the terminal) (see Connecting to Backend Database for more details)
To start the frontend run after cding into the frontend repo:
`npm start`
This should run studyNest on http://localhost:3000/
Have Fun :)

Hope your study group needs are met by SudyNest


## Creators
StudyNest is brought to you by:

Maheswari Bajji [https://github.com/mbajji]

Vishaka Bhat [https://github.com/vishaka-b]

Shriya Char [https://github.com/Shriya8]

Joy Cheng [https://github.com/joy-y-cheng]

Hannah Kendall [https://github.com/hannahkendall04]
