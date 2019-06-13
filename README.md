This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). For more details please go to original repo.

### Added packages

+ Jquery
+ Lodash
+ Antd

### To use env config files

Create react app scripts come with ability to detect environment variable defined in .env file.

+ **.env** file will be used on all command

+ **.env.production** file will be used on **npm run build** command

+ **.env.development** file will be used on **npm run start** command

Variables must be defined with REACT_APP_ prefix, mean if you want to define a variable called APP_NAME, in .env file it will look like this

```
REACT_APP_APP_NAME="Your application"
```

next define an export variable in <project_root>/config.js

```
export const APP_NAME=process.env.REACT_APP_APP_NAME;
```

and in .js file you can import it from <project_root>/config.js file

```
// from /App.js file
import { APP_NAME } from './config'
```