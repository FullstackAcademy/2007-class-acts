import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => {
  return(
    <div className="adminNav"><b>How did I get here? This is not my beautiful house.</b> <Link to="/">Click to go back home.</Link></div>
  )
}

export default NotFound
