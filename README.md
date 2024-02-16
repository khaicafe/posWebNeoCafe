# README #

This README would normally document whatever steps are necessary to get your application up and running.

## How do I get set up? ##
* Pre-requisites
* Configuration
* Accessing the application
* Deployment instructions

### Pre-requisites ###
* Install [Node.js](https://nodejs.org/en/)
* Install Yarn
* Install [Taskfile.dev](https://taskfile.dev/#/installation) to run tasks: `sandbox`, `release`, etc.

### Configuration ###
* `yarn install` to install dependencies
* `yarn dev` to start the development server
* Edit `/etc/hosts` file to serve with a custom domain name: http://web.neocafe.tech
    ```shell
    $ sudo nano /etc/hosts
    
    # Add this line
    0.0.0.0  web.neocafe.tech
    ```
* Open browser and go to `http://web.neocafe.tech:5173`

### Accessing the application ### 
* Admin account:
    * Phone number: `0786868998`
    * Password: `NeoMed@123`

### Deployment instructions ###
_All deployment tasks are defined in `Taskfile.yml` file. To run a task, use `task <task-name>` command._
* Sandbox:
  ```shell
  $ task sandbox
  ```
* Release to production:
    * Step 1: Release a git version with tag, using git flow
      ```shell
      $ git flow release start v0.0.1
      $ git flow release finish 'v0.0.1'
      ```
    * Step 2: Build and push an image to Docker Registry and ready to deploy to production.
      ```shell
      $ task release
      ```
    
