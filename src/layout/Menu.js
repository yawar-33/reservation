import React from 'react'

import { Link } from 'react-router-dom'

function Menu(props) {
  return (

    <div className="sidebar">
      {/* <a className="active" href="/">Periodic Table</a> */}
      <span>Periodic Tables</span>
      {/* <span className="oi oi-dashboard" /> */}
      <Link to="/dashboard">Dashboard</Link>
      {/* <i className="oi oi-magnifying-glass" /> &nbsp; */}
      <Link to="/search">Search</Link>
      {/* <i className="oi oi-plus" /> &nbsp; */}
      <Link to="/reservations/new">New Reservation</Link>
      {/* <i className="oi oi-layers" /> &nbsp;   */}
      <Link to="/tables/new">New Table</Link>
    </div>
  )
}

export default Menu
