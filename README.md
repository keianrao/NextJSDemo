
## Introduction

This is a collection of single-file pages, each containing a toy app, with little in common. Unlike my historical JavaScript demos, these pages are all in React, not plain HTML.



## Running the project

This is a Next.js app with commands listed in package.json. `bun dev` will start the development server on port 3000.

The Docker image will be hosted on [Render](https://render.com/login).



## Screenshots

![Index of website, showing three pages, 'Abacus' and 'Basic SQL examples' among them.](public/screenshot-3-2026_10_30.png)
![Abacus. 16-digit one, rendered on the page, with numbers above that can be typed into to manipulate.](public/screenshot-2-2026_10_29.png)
![Basic SQL examples. 'create' had been entered into a search box, and three cards are shown 'Insert row with immediate values', 'Create table', 'Add column to table', each with a SQL statement showing the syntax on variedly-typed columns.](public/screenshot-1-2026_10_30.png)
![Unfiltered cards, though search box is off-screen from scrolling to bottom. There are example for modifying columns.](public/screenshot-2-2026_10_30.png)



## Creation conditions and project motivation

This project was created just to spend some time to verify that I can put a Next.js app on Github, and possibly set up automatic builds (at least for the Docker image) in the future, when I get around to learning that.

The initial project state was created with a wizard: `bun create next-app` (being run on 28 October 2026, means [version 16.4.3 of the create-next-app NPM package](https://www.npmjs.com/package/create-next-app/v/16.4.3)).


