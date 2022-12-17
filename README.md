# Project-tracker

Kanban style board application made with Angular where users can register, login, create and manage their projects.

Notification system - Users are notified for every interaction with the application regardless if it was successfull or not.
Loading - Loading animation for all requests to the back-end.

Pages:

- Landing - The first page users see when they visit the application.
- Login - Users can login if not yet registered they can follow the link to the register page.
- Register - Users can register if already registered they can follow the link to the login page. (Guard redirect to this page if a guest tries to view restricted page)
- Projects - All of user's projects split by status(new, in progress or completed). User can change the type by clicking on the respective arrow.(Guard redirects to this page if logged in user tries to access guest only pages like Lgin, Register or Landing)
- Details - Detailed info about the project and delete functionality. After project deletion user is redirected to the Projects page.
- Profile - Detailed info about the User and change password functionality.
- Error - Shown when user tries to visit non existent route.

Architecture:

- All of the components, services, guards and validators are grouped in their respective folders.
- Folder services holds all the services related to authenticating users, managing the projects, showing notifications and search functionality.
- Folder guards consists of the two guards needed to prevent guests accessing user specific data and vice versa.
- interfaces.ts holds typescript specific interfaces.

Libraries:

- No additional libraries used.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
