import React, { Component } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import ErrorAlert from '../layout/ErrorAlert'

import ReservationList from '../reservation/ReservationList'
class SearchByPhone extends Component {
  constructor(props) {
    super(props)

    this.FindPhoneNumber =
      process.env.REACT_APP_API_BASE_URL + '/reservations/?mobile_phone='

    this.searchByPhoneModel = {
      mobile_number: '',
    }
    this.state = {
      searchByPhoneModel: this.searchByPhoneModel,
      response: '',
      errorFromAPI: ""
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      searchByPhoneModel: {
        ...this.state.searchByPhoneModel,
        [name]: value,
      },
    })
  }

  handleSubmit = () => {
    const { searchByPhoneModel } = this.state

    axios
      .get(this.FindPhoneNumber + searchByPhoneModel.mobile_number)
      .then((res) => {
        if (res.data.lenght > 0) {
          this.setState({
            response: res
          })
        } else {

          const error = {};
          error.message = "No reservations found message"
          this.setState({ errorFromAPI: error });
          return;
        }

      })
      .catch((error) => {
        this.setState({
          response: error,
        })
      })
  }
  render() {
    const { searchByPhoneModel, response, errorFromAPI } = this.state
    return (
      <>
        <h4 className="text-center">Search by Phone</h4>
        <hr />
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mobile_number">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              value={searchByPhoneModel.mobile_number}
              onChange={this.handleChange}
              required
              placeholder="Enter a customer's phone number"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => this.handleSubmit(e)}
        >
          Find
        </button>
        {response && response.data ? <ReservationList responseFromSearch={response} /> : null}
        {errorFromAPI ? <ErrorAlert error={errorFromAPI} /> : null}
      </>
    )
  }
}

export default withRouter(SearchByPhone)
