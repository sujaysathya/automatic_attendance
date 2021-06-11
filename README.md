<h1 align="center">Attendance Management System with Facial Recognition</h1>
<h2 align="center"><a href="https://github.com/srina1h/AAMSFrontend">Refer to main repo</a></h2>
<h2 align="center">A comprehensive and lightweight attendance management system ready for deployment in the real world</h2>
<h4 align="center">The system is able to register new students along with their subjects, and is able to record a classrooms' attendance through facial recognition. The data collected is stored in a simple local MySQL database</h4>

## How to run the server backend on local system
#### Clone backend repository
```bash
git clone https://github.com/srina1h/AAMSBackend
```
#### move to folder and install dependencies
```bash
cd AAMSBackend
npm install
```
#### create folders to store images
```bash
mkdir images
mkdir student_images
```
#### In student_image folder you need to either create a folder for each roll number and upload 2 images of student (or) register through the sign up portal on the front end which creates a new folder and uploads 2 pictures taken of the student from the browser
##### To upload manually
```bash
cd student_images
mkdir roll_no_example
```
##### ^ upload 2 images to this folder named 1.jpg and 2.jpg respectively

#### Now you need to create the SQL tables using
```bash
sqltest.js
```

#### This project uses the GPL-3.0 Licenese, please refer to LICENSE.md to know more
