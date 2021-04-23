import React, { Component } from 'react'
import { withRouter } from 'react-router'
import ErrorAlert from '../layout/ErrorAlert'
import axios from 'axios'
import Swal from 'sweetalert2'

import formatReservationDate from '../utils/format-reservation-date'
class Reservation extends Component {
  constructor(props) {
    super(props)
    this.Reservation_status =
      process.env.REACT_APP_API_BASE_URL + '/reservations'
    this.reservationModel = {
      first_name: '',
      last_name: '',
      mobile_number: '',
      reservation_date: '',
      reservation_time: '',
      people: 0,
    }

    this.state = {
      reservationModel: this.reservationModel,
      closingDay: '',
      futureDateVal: true,
      reservation_time_val: false,
      errorFromAPI: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.saveReservation = this.saveReservation.bind(this)
  }

  componentWillMount() {

    try {
      if (this.props.match.params.reservation_id !== undefined) {
        var res = this.props.match.params.reservation_id ? this.props.match.params.reservation_id.split(':') : "";
        axios.get(this.Reservation_status + "/" + res[1]).then((res) => {
          let resFromFun = formatReservationDate(res.data.data)
          this.setState({
            reservationModel: resFromFun,
          })
        }).catch((err) => {
          this.setState({
            errorFromAPI: err,
          })
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Get day by passing Date
  showDayByDate = (getdate) => {
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    var selectedDate = new Date(getdate)
    var dayName = days[selectedDate.getDay()]
    this.setState({
      closingDay: dayName,
    })
    return
  }

  futureDateCheck = (enteredDate) => {
    debugger
    var selectedDate = new Date(enteredDate)
    var now = new Date();
    now = new Date(now)
    if (selectedDate.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0)) {
      this.setState({
        futureDateVal: !this.state.futureDateVal,
      })
      return // Date must be in the future
    }
  }

  validateTime = () => {
    const { reservationModel } = this.state

    let Valid_Time_OP = '10:30'
    let Valid_Time_CO = '21:30'
    if (reservationModel.reservation_time < Valid_Time_OP) {
      this.setState({
        reservation_time_val: !this.state.reservation_time_val,
      })
      return false
    }
    if (reservationModel.reservation_time > Valid_Time_CO) {
      this.setState({
        reservation_time_val: !this.state.reservation_time_val,
      })
      return false
    }
    return true
  }
  handleChange(event) {
    const { name, value } = event.target

    if (name === 'reservation_date') {
      // run only this function when user will enter Date
      this.showDayByDate(value)
      this.futureDateCheck(value)
    }
    this.setState({
      reservationModel: {
        ...this.state.reservationModel,
        [name]: value,
      },
    })
  }

  saveReservation(event) {
    event.preventDefault()

    const validationErr = {};

    let Validation_Res = this.validateTime();
    if (this.state.futureDateVal === false) {
      validationErr.message = "Past Date Can't be Selected"
      this.setState({ errorFromAPI: validationErr })
      return;
    }
    if (this.state.closingDay === 'Tuesday') {
      validationErr.message = "Resturant Will Close"
      this.setState({ errorFromAPI: validationErr })
      return;
    }

    if (this.state.reservation_time_val) {
      validationErr.message = "Invalid Time"
      this.setState({ errorFromAPI: validationErr })
      return;
    }

    let reser_Model = { ...this.state.reservationModel };
    let day = this.showDayByDate(reser_Model.reservation_date)
    let futureDate = this.futureDateCheck(reser_Model.reservation_date)
    console.log(Validation_Res, day, futureDate);
    reser_Model.people = parseInt(reser_Model.people, 10)              // convert people from str to number 
    let data = { data: {} };
    data.data = reser_Model
    if (Validation_Res) {


      if (reser_Model.reservation_id) {                       // for update
        // /:reservation_id/status

        axios
          .put(this.Reservation_status + "/" + reser_Model.reservation_id + '/status', data)
          .then((res) => {
            Swal.fire('Updated!', '', 'success').then(() => {
              this.setState(
                {
                  reservationModel: res.data,
                },
                () => {
                  this.props.history.push(
                    `/dashboard`,
                    { from: '/reservations/new' },
                    { date: this.state.reservationModel.reservation_date },
                  )
                },
              )
            })
          })
          .catch((err) => {
            this.setState({ errorFromAPI: err })
          })
      } else {                                                    // to create new reservation
        axios
          .post(this.Reservation_status, data)
          .then((res) => {
            this.setState(
              {
                reservationModel: res.data,
              },
              () => {
                this.props.history.push(
                  `/dashboard`,
                  { from: '/reservations/new' },
                  { date: this.state.reservationModel.reservation_date },
                )
              },
            )
          })
          .catch((error) => {
            this.setState({
              errorFromAPI: error,
            })
          })
      }

    } else {
      const err = {};
      err.message = "invalid time"
      this.setState({ errorFromAPI: err })
    }
  }

  handleRoutes = () => {
    // history.push(`/reservations/new`, { from: '/dashboard' })
    this.props.history.goBack()
  }

  render() {
    const {
      reservationModel,
      errorFromAPI,
    } = this.state
    return (
      <>
        <h4 className="text-center">Reservation Form</h4>
        <hr />
        <form onSubmit={(event) => this.saveReservation(event)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={reservationModel.first_name}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={reservationModel.last_name}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="mobile_number">Mobile #</label>
              <input
                type="text"
                className="form-control"
                id="mobile_number"
                name="mobile_number"
                value={reservationModel.mobile_number}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="reservation_date">Date of Reservation</label>
              <input
                type="date"
                className="form-control"
                id="reservation_date"
                name="reservation_date"
                value={reservationModel.reservation_date}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Time of Reservation</label>
              <input
                type="time"
                className="form-control"
                id="reservation_time"
                name="reservation_time"
                value={reservationModel.reservation_time}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Number of people</label>
              <input
                type="number"
                className="form-control"
                id="people"
                name="people"
                value={reservationModel.people}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary float-right"
            onClick={this.handleRoutes}
          >
            cancel
        </button>
        </form>
        {this.state.messageDay ? <ErrorAlert error={this.state.messageDay} /> : null}
        {this.state.messageFuture ? <ErrorAlert error={this.state.messageFuture} /> : null}
        {this.state.messageForTimeOP ? (
          <ErrorAlert error={this.state.messageForTimeOP} />
        ) : null}
        {errorFromAPI ? <ErrorAlert error={errorFromAPI} /> : null}
      </>
    )
  }
}

export default withRouter(Reservation)
