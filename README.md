## Components
Table here

## Pages
Table here

## Services

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
