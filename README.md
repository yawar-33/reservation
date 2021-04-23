# Capstone: Restaurant Reservation System Frontend

## Live Application Link
https://starter-restaurant-reservation-coral.vercel.app/

## Apis Documenatation
| ------------------------------------------------------------------------------------------------------------------- |
| '/reservation/reservation_id'              | Method : Get  | To Get Reservation Details By ID                       |
| `/reservations/reservation_id/status`      | Method : Put  | Update Reservation                                     |
| `/reservations/`                           | Method : Post | Create New Reservation                                 |
| `/reservations?date=2021-04-20`            | Method : Get  | Get Reservation By Date                                |
| `/reservations`                            | Method : Get  | Get All Reservation                                    |
| `/reservations/?mobile_phone=`             | Method : Get  | Get Reservation By PH #                                |
| `/tables`                                  | Method : Get  | Get All Tables                                         |
| `/tables`                                  | Method : POST | Register New Table                                     |
| `tables/reservation_id/seat`               | Method : PUT  | Seat Guest Against Table                               |


## Screen Shots


## Summary

> The software is used only by restaurant personnel when a customer calls to request a reservation.
> You can Book, Reservation, Seat Reservation and Cancel it as well.
> At this point, the customers will not access the system online.

## Technology
| ------------------------------------------------------------------------------------------------------------------- |
| 'Frontend'                                 | React Js                
| `Backend`                                  | Node js, Express Js,Kanex                                              |

## Installation Instructions 
1. clone this repository.
2. Run `cp ./back-end/.env.sample ./back-end/.env`.
3. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
4. Run `cp ./front-end/.env.sample ./front-end/.env`.
5. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
6. Run `npm install` to install project dependencies.
7. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.