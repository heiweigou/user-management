import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Col } from 'react-bootstrap'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
class Create extends React.Component {
    constructor() {
        super()
        this.state = {
            incident: '',
            name: '',
            email: '',
            department: '',
            app:'RAI',
            typeOfAccess:'Read',
            isOngoingAccess: true,
            requestedDate: new Date(),
            accessStartDate: new Date(),
            accessEndDate: new Date()
        }
        this.checkHandler = this.checkHandler.bind(this)
        this.dateHandler = this.dateHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
    }


    inputHandler(e) {
        e.persist()
        let {type, name }= e.target
        let value=type==='checkbox'?e.target.checked:e.target.value
        this.setState({
            [name]:value
        })


    }
    checkHandler(e) {
        let isChecked = e.target.checked
        this.setState({
            isOngoingAccess: isChecked
        })
    }

    dateHandler(selectedDate, name) {
        let obj = {}
        obj[name] = selectedDate
        // console.log(obj)
        this.setState(obj)
    }

    render() {
        return <Form>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Incident Number</Form.Label>
                    <Form.Control name='incident' type='text' value={this.state.incident} onChange={this.inputHandler}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email' type='email' value={this.state.email} onChange={this.inputHandler}/>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control name='name' type='text' value={this.state.name} onChange={this.inputHandler}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Department</Form.Label>
                    <Form.Control name='department' type='text' value={this.state.department} onChange={this.inputHandler}/>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Requested Application</Form.Label>
                    <Form.Control as='select' onChange={this.inputHandler} name='app' value={this.state.app}>
                        <option value='RAI'>RAI</option>
                        <option value='STREAMS'>STREAMS</option>
                        <option value='SCATS'>SCATS</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Type of Access</Form.Label>
                    <Form.Control as='select' onChange={this.inputHandler} name='typeOfAccess' value={this.state.typeOfAccess}>
                        <option value='Read'>Read</option>
                        <option value='Insert and Update'>Insert and Update</option>
                    </Form.Control>
                </Form.Group>

            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Requested Date</Form.Label>
                    <DatePicker selected={this.state.requestedDate} dateFormat='dd/MM/yyyy' onChange={(e) => this.dateHandler(e, 'requestedDate')} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Access Start Date</Form.Label>
                    <DatePicker minDate={this.state.requestedDate} selected={this.state.accessStartDate} dateFormat='dd/MM/yyyy' onChange={(e) => this.dateHandler(e, 'accessStartDate')} />
                </Form.Group>

            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Check label='Onging Access' checked={this.state.isOngoingAccess} onChange={this.checkHandler} />
                </Form.Group>


                {this.state.isOngoingAccess && <>
                    <Form.Group as={Col}>
                        <Form.Label>Access End Date</Form.Label>
                        <DatePicker minDate={this.state.accessStartDate} selected={this.state.accessEndDate} dateFormat='dd/MM/yyyy' onChange={(e) => this.dateHandler(e, 'accessEndDate')} />
                    </Form.Group>
                </>}
            </Form.Row>

            {this.state.isOngoingAccess && <>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Months</Form.Label>
                        <Form.Control type='text' />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Weeks</Form.Label>
                        <Form.Control type='text' />
                    </Form.Group>
                </Form.Row>
            </>}




        </Form>
    }
}

export default Create