import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Col, Inpu, Table } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { format, compareAsc, addMonths, addWeeks, differenceInCalendarMonths } from 'date-fns'
import { BrowserRouter as Router, Switch, Route, Redirect, Link, useParams } from 'react-router-dom'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            userData: {
                name:'',
                email:'',
                department:''
            },
            incidents:[],
            dateConverted:false
        }
    }
    componentDidMount() {
        // console.log(this.props.incidentId)
        fetch("/users/" + this.props.userId)
            .then(res => res.json())
            .then(
                (result) => {
                   let data=this.convertStrToDateInData(result.incidents)
                    this.setState({
                        userData: result.user,
                        incidents:data
                    })
                   
                    console.log(this.state.incidents)
                }

            )
            .then(

            )
    }

    convertStrToDateInData(oldData){
        let data=''
        data=oldData.map(item=>{
            let endDate=item.access_end_date
            let requestDate=item.requested_date
            let startDate=item.access_start_date
            let extendDate=item.extend_date
            let disableDate=item.disable_date
         
            item.requested_date=requestDate!==null? new Date(requestDate):null
            item.access_start_date=startDate!==null? new Date(startDate):null
            item.access_end_date=endDate!==null? new Date(endDate):null
            item.extend_date=extendDate!==null? new Date(extendDate):null
            item.disable_date=disableDate!==null? new Date(disableDate):null
            return item
        })
        
        return data
    }
    getDateColor(endDate) {
        let today = new Date()
        let color = ''
        color = compareAsc(endDate, today) <= 0 ? 'table-danger' : 'table-primary'
        return color
      }
 
    tableBody(){
        let data=this.state.incidents
      console.log(this.state)
        return(<tbody>
            {data.map(item=>{
                let endDate=item.access_end_date
                let requestDate=item.requested_date
                let startDate=item.access_start_date
                let extendDate=item.extend_date
                let disableDate=item.disable_date
                return(
                    <tr>
                        <td>
                            <Link to={'/incidents/edit/'+item.id}>{item.incident}</Link>
                            
                        </td>
                        <td>
                            {item.app}
                        </td>
                        <td>
                            {item.approved_by}
                        </td>
                        <td>
                            {item.approved_by_its}
                        </td>
                        <td>
                            {requestDate&&format(requestDate, 'dd/MM/yyyy')}
                        </td>
                        <td>
                        {startDate!==null&&format(startDate, 'dd/MM/yyyy')}
                        </td>
                        <td className={endDate === null ? 'table-success' : this.getDateColor(endDate)}>
                        {endDate !== null ? format(endDate, 'dd/MM/yyyy') : 'ongoing'}
                        </td>
                        <td>
                        {extendDate!==null&&format(extendDate, 'dd/MM/yyyy')}
                        </td>
                        <td>
                        {disableDate!==null&&format(disableDate, 'dd/MM/yyyy')}
                        </td>
                    </tr>
                )
            })}
        </tbody>)
    }
    render() {

        return (
            <div>
                <Form>
                    <Link to='/'>Home</Link>
                    <Form.Row>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='incident' type='text' value={this.state.userData.name} disabled />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control name='email' type='text' value={this.state.userData.email} disabled />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Department</Form.Label>
                            <Form.Control name='department' type='text' value={this.state.userData.department} disabled />
                        </Form.Group>
                    </Form.Row>
                </Form>
                <Table>
                    <TableHead/>
                    {this.state.incidents.length>0&&this.tableBody()}
                </Table>


            </div>
        )
    }
}
function TableHead(){
    return(
        <thead>
        <tr>
          <th>
            Incident
        </th>
        <th>
          App
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
    )
}

export default Users