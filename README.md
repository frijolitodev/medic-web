# MedicWeb
[<img src="https://img.shields.io/badge/React-TypeScript-blue">](https://img.shields.io/badge/React-TypeScript-blue)
[<img src="https://img.shields.io/badge/TailwindCSS-DaisyUI-blueviolet">](https://img.shields.io/badge/TailwindCSS-DaisyUI-blueviolet)
[<img src="https://img.shields.io/badge/React%20Router-v6-green">](https://img.shields.io/badge/React%20Router-v6-green)
[<img src="https://img.shields.io/badge/Vite-1.3.0-green">](https://img.shields.io/badge/Vite-1.3.0-green)


## Summary
MedicWeb is an application coded in React + TS, implementing tailwind with opinionated DaisyUI styles.
It's main goal is to serve as a directory and link for doctors and patients to connect online so a patient can schedule a consultation and a doctor can accept it.

## Components
React login is separated into components to render specific functionality, here's a chart with all (almost) our components implemented with a quick recap.

| Components          | Functionality                                                  |
|---------------------|----------------------------------------------------------------|
| UserAppointments    | Used to handle user appointments, get or create an appointment |
| RequireAuth         | Used to verify user data                                       |
| AppointmentCard     | Used for provide appointment information                       |
| CardBase            | Used to provide basic information                              |
| DoctorCard          | Used to provide doctor information                             |
| ClinicAsMap         | Used to display a map with the clinics available               |
| ClinicsDisplayer    | Used to display all the clinics available                      |
| DatePickerDisplayer | Used to display the dates that the patience can choose         |
| DoctorDisplayer     | Used to display the doctor's available                         |
| HourPickerDisplayer | Used to display the hour's available                           |
| Header              | Used to display the header                                     |
| DateInput           | Used to get date input                                         |
| RadioInput          | Used to get radio input                                        |
| TextInput           | Used to get text input                                         |
| Layout              | Contains the elements that are fixed in the page               |
| Map                 | Used to handle map behavior                                    |
| Marker              | Used to handle with card was marked                            |
| Menu                | Displays the navbar menu                                       |
| Navbar              | Displays the navbar                                            |
| Spinner             | Is used when the page is loading                               |
| UserInfo            | Provides the user info and returns a greeting                  |

## Services
These services are connected to [MedicAPI](https://github.com/medic-dir-sv/medic-api), an axios instance is implemented to navigate easily through all the request needed for querying and mutating data alongside react-query.


### Appointment

| HTTP Method | Method                 | Path                            | Functionality                                     |
|-------------|------------------------|---------------------------------|---------------------------------------------------|
| GET         | myAppointments         | _/api/appointment/mine_         | Get appointments for the current patient          |
| GET         | myAppointmentsAsDoctor | _/api/appointment/doctor/mine_  | Get appointments for the current doctor           |
| PATCH       | acceptAppointment      | _/api/appointment/accept/${id}_ | Accepts an appointment that has a pending status  |
| PATCH       | deleteAppointment      | _/api/appointment/delete/${id}_ | Delete's an appointment that was register         |
| PATCH       | updateAppointment      | _/api/appointment/update/${id}_ | Update's an appointment                           |
| POST        | createAppointment      | _/api/appointment/new_          | Create a new appointment                          |

### Auth

| HTTP Method | Method   | Path                 | Functionality                            |
|-------------|----------|----------------------|------------------------------------------|
| POS         | login    | _/api/auth/login_    | Makes login process                      |
| GET         | me       | _/api/auth/me_       | Get the information for the current user |
| POST        | register | _/api/auth/register_ | Makes register process                   |

### Doctor

| HTTP Method | Method          | Path                                | Functionality                              |
|-------------|-----------------|-------------------------------------|--------------------------------------------|
| GET         | getAll          | _/api/doctor/all_                   | Get all the doctors in the database        |
| GET         | getById         | _/api/doctor/${email}_              | Get a doctor by id                         |
| GET         | getAvailability | _/api/doctor/${email}/availability_ | Get the available schedule from the doctor |

### HTTP

| Method  | Functionality              |
|---------|----------------------------|
| request | Send the request to axios  |

## Pages
The main routes of the application. They are powered by react-router v6.

| Page         | Description                                                                                                                                                  |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /appointments | A doctor is chosen from a displayed list,  We choose the day we would like to go, We choose the hours of availability of the doctor that we chose previously |   
| /home  | Returns the user's screen information, Returns the information on the screen of the user's scheduled appointments                                            |                                                             
| /         | The Landing page returns the login screen to access the application                                                                                                                                                                                                                               |
| /login    | login/The login page returns on the screen the entry to the user of the application, where the user can enter his username and password, in case he does not have an account, he will have the option to register to the application                                                              |
| /register | The registration page the user will be able to enter their personal data such as their name, email, a profile image, they will be able to have a password, their last names, their birthday, their telephone number and they will have the option to register as a doctor in the given case it is |