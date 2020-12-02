import React from 'react';
import logo from './logo.svg';
import './App.css';
import { stat } from 'fs';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import { Button, Form, Col } from 'react-bootstrap'
import { format, compareAsc } from 'date-fns'

class DashBoard extends React.Component {

  render() {
    return (
      <div>
        <thead>
          <tr>

            <th>
              User Name
          </th>
            <th>
              Email
          </th>
            <th>
              Department
          </th>

            <th>
              RAI
          </th>
            <th>
              SCATS
          </th>
            <th>
              STREAMS
          </th>
            <th>
              Access Start Date
          </th>
            <th>
              Access End Date
          </th>
            <th>
              Access Extension Date
          </th>
            <th>
              Access Disable Date
          </th>
            <th>
              Actions
          </th>

          </tr>
        </thead>

      </div>
    )
  }
}

export default DashBoard