import React from 'react';
import logo from './logo.svg';
import './App.css';
import { stat, access } from 'fs';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import { Button, Form, Col } from 'react-bootstrap'
import { format, compareAsc } from 'date-fns'
import { it } from 'date-fns/esm/locale';
import Create from './Create'
import Users from './Users'
import Edit from './Edit'
import DashBoard from './DashBoard'
import Email from './Email'

import { BrowserRouter as Router, Switch, Route, Link, Redirect, useParams } from 'react-router-dom'



class App extends React.Component {

  constructor() {
    super()
    this.state = {
      data: [],
      app: 'all',
      timeStamp: '',
      redirect: false,
      incidents: []
    }
    this.actionHandler = this.actionHandler.bind(this)
    this.appHandler = this.appHandler.bind(this)
    this.userHandler = this.userHandler.bind(this)
    this.selectUserHandler = this.selectUserHandler.bind(this)
    this.selectExpiredUsers = this.selectExpiredUsers.bind(this)

  }
  componentDidMount() {
    // console.log('im app.js')
    fetch("/getIncidents")
      .then(res => res.json())
      .then(
        (result) => {
          let data = this.convertStrToDateInData(result.data)
          let newData = ''
          newData = data.map(item => {
            item.isSelected = false
            return item
          })
          // console.log(newData)
          this.setState({
            data: newData,
            timeStamp: new Date().getTime()
          })

        }

      )

  }

  //convert date string to date object when fetch data from ajax
  convertStrToDateInData(oldData) {
    let data = ''
    data = oldData.map(item => {
      let endDate = item.access_end_date
      let requestDate = item.requested_date
      let startDate = item.access_start_date
      let extendDate = item.extend_date
      let disableDate = item.disable_date

      item.requested_date = requestDate !== null ? new Date(requestDate) : null
      item.access_start_date = startDate !== null ? new Date(startDate) : null
      item.access_end_date = endDate !== null ? new Date(endDate) : null
      item.extend_date = extendDate !== null ? new Date(extendDate) : null
      item.disable_date = disableDate !== null ? new Date(disableDate) : null
      return item
    })

    return data
  }


  getDateColor(endDate) {
 
    let color = ''
    color =this.isExpired(endDate) ? 'table-danger' : 'table-primary'
    return color
  }

  isExpired(endDate){
    let flag=false
    let today = new Date()
    flag=compareAsc(endDate,today)<= 0 ? true : false
    return flag
  }

  appHandler(e) {
    this.setState({
      app: e.target.value
    })
  }

  //get user details when clicked
  userHandler(e, userId) {
    let userData = this.state.data.filter(item =>
      item.user_id === userId)
    // console.log(userId, userData)
    this.setState({
      redirect: true
    })
  }


  //select users or incidents
  selectUserHandler(e, item) {
    let isChecked = e.target.checked
    let id=item.id
    let incidents=null
    let data=this.state.data.map(item=>{
      if (item.id===id){
        item.isSelected=isChecked
      }
      return item
    })

    this.setState({
      data:data
    })
    
    
   incidents= this.getSelectedEmails()
   this.setState({
     incidents:incidents
   })
  }


  //select expired access users
  selectExpiredUsers() {
    let data=[...this.state.data]
    let incidents=null
    let newData=data.map(item=>{
      let accessEndDate=item.access_end_date
      if(this.isExpired(accessEndDate)){
        item.isSelected=true
      }
      return item
    })
    // console.log(newData)
    this.setState({
      data:newData
    })
    incidents=this.getSelectedEmails()
    this.setState({
      incidents:incidents
    })

    // console.log(this.state.data)
  }
  // getSelectedEmails() {
  //   let emails = []
  //   let data = this.state.data.filter(item => {
  //     return item.isSelected === true
  //   })
  //   emails = data.map(item => {
  //     return item.email
  //   })

  //   this.setState({
  //     emails: emails
  //   })

  //   // console.log(emails)
  // }

  getSelectedEmails(){
    let data=this.state.data.filter(item=>item.isSelected)
    return data
  }
  actionHandler(e, index) {
    e.persist()
    let valueHandler = e.target.value


    for (let [i, item] of this.state.data.entries()) {
      console.log(i,item)
      if (item.index === index) {
        let items = [...this.state.data]
        let item = items[i]

        if (valueHandler === 'extend') {
          item.extensionDate = new Date()
        }
        else if (valueHandler === 'disable') {
          item.disabledDate = new Date()
        }


        this.setState({
          data: items
        })

        break
      }
    }

  }

  getTable(data) {
    let filter = this.state.app
    let filteredData = this.state.app === 'all' ? data : data.filter(item =>
      item.app === filter
    )

    return (
      <>
        <thead>
          <tr>
            <th>
              Select
            </th>
            <th>
              Incident
          </th>
            <th>
              App
          </th>

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
              Approved By
          </th>
            <th>
              Approved By ITS
          </th>
            <th>
              Requested Date
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
        <tbody>

          {filteredData.map(item => {
            let endDate = item.access_end_date
            let requestDate = item.requested_date
            let startDate = item.access_start_date
            let extendDate = item.extend_date
            let disableDate = item.disable_date
            let userId = item.user_id
            let id=item.id
            let isSelected = item.isSelected

            
            
            return <tr key={item.id}>
              {/* <td><Form.Check onClick={(e) => this.selectUserHandler(e, item)} value={isSelected} /></td> */}
              <td><input type='checkbox' onClick={(e) => this.selectUserHandler(e, item)} checked={isSelected} /></td>
              <td><Link  to={'/incidents/edit/'+id}>{item.incident}</Link></td>
              <td>{item.app}</td>
              <td>
                <Link to={'/users/' + userId} >{item.name}</Link>
              </td>
              {/* <td onClick={(e)=>this.userHandler(e,userId)}>{item.name}</td> */}
              <td>{item.email}</td>
              <td>{item.department}</td>
              <td>{item.approved_by}</td>
              <td>{item.approved_by_its}</td>
              <td>{format(requestDate, 'dd/MM/yyyy')}</td>
              <td>{format(startDate, 'dd/MM/yyyy')}</td>
              <td className={endDate === null ? 'table-success' : this.getDateColor(endDate)}>{endDate !== null ? format(endDate, 'dd/MM/yyyy') : 'ongoing'}</td>
              <td>{extendDate !== null && format(extendDate, 'dd/MM/yyyy')}</td>
              <td>{disableDate !== null && format(disableDate, 'dd/MM/yyyy')}</td>

              <td>
                <Button onClick={(e) => this.actionHandler(e, item.id)} value='extend'>Extend</Button>
                <Button onClick={(e) => this.actionHandler(e, item.id)} variant='danger' value='disable'>Disable</Button>
                <Link  to={'/incidents/edit/'+id}>Edit</Link>
              </td>
            </tr>
          })}
        </tbody>
      </>

    )
  }


  render() {
    let data = this.state.data


    return (
      <Router>

        <div className='float-right'>

          <Link to='/new' >New Request</Link>
        </div>

        <Switch>
          <Route exact path='/new'>
            <Create />

          </Route>
          <Route exact path='/home'>
            <DashBoard />
          </Route>
          <Route exact path='/incidents/edit/:id' >
            <EditIncidents />
          </Route>
          <Route exact path='/'>
            <Form>
              <Form.Group as={Col} md='2'>
                <Form.Control as='select' onChange={this.appHandler} name='app' value={this.state.app}>
                  <option value='all'>All Apps</option>
                  <option value='RAI'>RAI</option>
                  <option value='SCATS'>SCTAS</option>
                  <option value='STREAMS'>STREAMS</option>
                </Form.Control>
                <Button variant='primary' onClick={this.selectExpiredUsers}>Select Expired users</Button>

              </Form.Group>
            </Form>
            <Table>
              {this.getTable(data)}
            </Table>
           
            {/* <Email emails={this.state.emails} /> */}
            <Email incidents={this.state.incidents} />

          </Route>
          <Route exact path='/users/:id' >
            <GetUsers />
          </Route>


        </Switch>
      </Router>
    )
  }
}

function EditIncidents() {
  let incidentId = useParams().id
  return <Edit incidentId={incidentId} />
}

function GetUsers() {
  let userId = useParams().id

  return <Users userId={userId} />
}

export default App;
