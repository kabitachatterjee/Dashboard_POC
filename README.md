Preview of Application

[![Preview_Readdit](https://img.youtube.com/vi/coiIsXuIlX4/0.jpg)](https://www.youtube.com/watch?v=coiIsXuIlX4)

# Readable API Server

This project is React + Redux + React Router +  Material UI clone of Reddit. 

# Features:
   * React Router V4
   * Node for API management
   * Redux for state management of categories (subreddits), posts and comments.
   * User can CRUD categories, posts and comments.
   * Users can vote on posts and comments. 
   * Sorting of posts and comments by votes or timestamp.
   * Navigate to posts only specific to one type of category (subreddit).

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

## Start Developing

To get started developing right away:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, use Create React App to scaffold out the front-end
    - `create-react-app frontend`
    - `cd frontend`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## License
The MIT License (MIT)

Copyright (c) 2016 MichaelHuyTran@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
