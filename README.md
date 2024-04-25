# Task Management by Aqeeq Technologies

A task management app with a user friendly UI wherein a user can register and sign-in with their email and password. Once verified, the user can the manage their tasks.

## Features

-   User friendly Interface
-   Create, Update and Delete tasks according to your needs
-   Mark a task as important or not
-   mark the task as completed once you are done with a task
-   Filter the tasks according to their status, i.e. Active and Completed

## Tech Stack

**Client:** React, React Context API, TailwindCSS, React-Flowbite

-Utilised the React's Context API for user state management, TailwindCSS and React-flowbite for a User Friendly UI.

**Server:** Node, Express, MongoDB, JWT, BCrypt

-Used MongoDB as the database, JWT for authentication and BCrypt Algorithm to hash and secure user passwords.

## Run Locally

-Backend (server)

Clone the project

```bash
  git clone https://github.com/akshat-315/todo.git
```

Go to the project directory

```bash
  cd ./server
```

Install dependencies

```bash
  npm install
```

Create a .env file and give your own mongoDB Url and PORT number

Start the server

```bash
  npm run dev
```

-frontend (client)

Go to the project directory

```bash
  cd ./server
```

Install dependencies

```bash
  npm install
```


Start the server

```bash
  npm run dev
```

##Considerations

First aim was to set up the database and the required schemas (User and Todo). Once they were set-up, I created the user authentication APIs (Sign-in, Sign-up and Sign-out). For the Authentication part, I have tried to use JWT. We can also use the OAuth for the users to register and Sign-In, however that has not been integrated in this project yet. For the security point of view, I had to Hash the passwords in the database too, and for that I used the BCrypt Algorithm. 

The main challenge that i had to face was using the React Context API. I used this a long time ago and I had to recall the concepts. Took me a day but I figured out a way to manage the user state with the help of React Context. Since I didn't have much time left, I decided to not to use React Context for managing the task state which proved out to be very ineffecient. If i had more time, I would use the context API for managing the task state also. I had to write a lot of code in order to make it work which could have not been the case had i used to the context API for task state management also.
Since Context API would have allowed me to explore many options such as isLoading, isError functionalities (which i would have to code myself), not using Context API forced me to make use of useState hook as much as possible.

What could have been done in one to two lines of code, was done in much much more lines of code which is very ineffecient for a production environment.
Given more time, I can make this application more reusable and production ready. However the application still works great but its complexity will increase and it is not very scalable.

I can also make use of React Query (now tanstack query) for query and mutation function as it provides caching and many other useful functionalities. The initial setup is something to think about but it is very much doable.
One can also use Redis for this application as it provides in-memory data structure which reduces the querying time by almost 5 times of the inital one.
There are alot of ways in which this application can get better, for sure.



## Application Walkthrough ->


https://github.com/akshat-315/todo/assets/130206602/716c09a8-f6c4-43d9-987e-c9783abaf8bc
