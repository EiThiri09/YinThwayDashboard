# Getting Started with React Typescript Base Template

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Proposed structure
src<br/>
├──components<br/>
├──const<br/>
├──environments<br/>
├──pages<br/>
├──services<br/>
├──configs<br/>
├──store<br/>
├──types<br/>
└──utils<br/>
└──assets<br/>
Layouts<br/>

## Details of structure
| Folder name  | What is it used for |
| ------------- | ------------- |
| components  | Contains reusable components that are most often used to compose Feature or Page components |
| constants  | Contains reusable & immutable strings like URLs or Regex Patterns |
| pages  | Contains Page Components. Each Page Component is associated with a route |
| services  | Contains reusable code for interacting with an API |
| styles  | Reusable or global styles (CSS) |
| types  | Reusable types for projects utilizing TypeScript or Flow |
| utils  | Reusable utility functions |
| store  | Store states that used in many components |
| configs  | Contain axio configuration and firebase configration |
| assets  | Contain css and svg  |
| evnironment  | Contain configuration to deploy  |

| File name  | What is it used for |
| ------------- | ------------- |
| layouts  | A Layout Component is a component that composes the layout of a page |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
