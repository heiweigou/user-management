import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Col, Input,Table } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { format, compareAsc, addMonths, addWeeks, differenceInCalendarMonths } from 'date-fns'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'

class Edit extends React.Component {
    constructor() {
        super()
        this.state = {
            incident: '',
            name: '',
            email: '',
            department: '',
            app: 'RAI',
            typeOfAccess: {
                read_rai: true,
                update_rai: false,
                insert_update_rai: false,
            },
            requestedDate: new Date(),
            accessStartDate: new Date(),
            accessEndDate: null,
            isOngoingAccess: false,
            isSubmitted: false,
            timeStamp:'',
            emails:[]

        }
        this.checkHandler = this.checkHandler.bind(this)
        this.dateHandler = this.dateHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
        this.accessHandler = this.accessHandler.bind(this)
        this.selectAppHandler = this.selectAppHandler.bind(this)
    }

    showAccessPeriod() {
        let numberOfMonths = null
        let { accessStartDate, accessEndDate } = this.state
        numberOfMonths = differenceInCalendarMonths(accessEndDate, accessStartDate)
        return numberOfMonths
    }
    componentDidMount(){
        fetch('/incidents/edit/'+this.props.incidentId)
        .then(res=>res.json())
        .then(result=>{
            Object.entries(result.data.incidents.typeOfAccess).forEach(([key,value])=>{
                if(value===0){
                    result.data.incidents.typeOfAccess[key]=false
                }
                else if(value===1){
                    result.data.incidents.typeOfAccess[key]=true
                }
            })
            console.log(result.data)
            this.setState(result.data.incidents)
            this.setState({
                emails:result.data.emails
            })

           
        })
    }

    accessHandler(e) {
        e.persist()
        let { type, name, value } = e.target
        let checked = e.target.checked
        let data = { ...this.state.typeOfAccess }
        let radioData = {
            read_rai: false,
            update_rai: false,
            insert_update_rai: false,
        }
        if (type === 'radio') {
            radioData[value]=checked
            this.setState({
                typeOfAccess: radioData
            })
        }
        else {
            
            data[value] = checked
            this.setState({
                typeOfAccess: data
            })
        }



        console.log(e)
    }

    selectAppHandler(e) {
        let { name, value } = e.target
        let accessObj = {}
        console.log(name)
        console.log(value)
        if (value === 'RAI') {
            accessObj = {
                read_rai: true,
                update_rai: false,
                insert_update_rai: false,
            }
        }
        else if (value === 'SCATS') {
            accessObj = {
                scats: true,
                SCATS_Traffic_Report: false,
                SCATS_History_Viewer: false,
                Unusual_Congestion_Viewer: false,
                LxListG: false,
            }
        }
        else if (value === 'STREAMS') {
            accessObj = {
                Monitor_All: false,
                Monitor_Limited: true,
                Media: false,
                Ramp_Control: false,
                Ramp_Monitoring: false,
                Regional_Maint: false,
                Regional_Maintenance_with_DMS: false,
                Signal_Control: false,
                TMC: false,
                TMC_Support: false,
                ITS_Project: false
            }
        }
        this.setState({
            typeOfAccess: accessObj,
            app: value
        })


    }

    inputHandler(e) {
        e.persist()
        let { type, name } = e.target
        let value = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name]: value,

        })


        if (name === 'months' && !isNaN(value)) {

            let date = ''
            date = addMonths(this.state.accessStartDate, value)
            this.setState({
                accessEndDate: date
            })

        }
        else if (name === 'weeks' && !isNaN(value)) {

            let date = ''
            date = addWeeks(this.state.accessStartDate, value)
            this.setState({
                accessEndDate: date
            })
        }


    }
    checkHandler(e) {
        let isChecked = e.target.checked
        this.setState({
            isOngoingAccess: isChecked,
            accessEndDate: null
        })
    }

    dateHandler(selectedDate, name) {
        let obj = {}
        obj[name] = selectedDate
        // console.log(obj)
        this.setState(obj)
    }

    submit(e) {
        // e.preventDefault()
        let data = { ...this.state }
        data.accessStartDate = format(data.accessStartDate, 'yyyy-MM-dd HH:mm:ss')
        data.requestedDate = format(data.requestedDate, 'yyyy-MM-dd HH:mm:ss')
        data.accessEndDate = data.accessEndDate !== null ? format(data.accessEndDate, 'yyyy-MM-dd HH:mm:ss') : null

        
        fetch('/incidents/edit/'+this.props.incidentId, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        this.setState({
            isSubmitted: true,
            timeStamp:new Date().getTime()
        })


    }

    render() {

        return <Form onSubmit={(e) => {
            this.submit(e)
        }}>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Incident Number</Form.Label>
                    <Form.Control name='incident' type='text' value={this.state.incident} onChange={this.inputHandler} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email' type='email' value={this.state.email} onChange={this.inputHandler} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control name='name' type='text' value={this.state.name} onChange={this.inputHandler} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Department</Form.Label>
                    <Form.Control name='department' type='text' value={this.state.department} onChange={this.inputHandler} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Requested Application</Form.Label>
                    <Form.Control as='select' onChange={this.selectAppHandler} name='app' value={this.state.app}>
                        <option value='RAI'>RAI</option>
                        <option value='STREAMS'>STREAMS</option>
                        <option value='SCATS'>SCATS</option>
                    </Form.Control>
                </Form.Group>


            </Form.Row>
            <Form.Row>

                <Form.Group>
                    <Form.Label>Type of Access</Form.Label>
                    {this.state.app === 'RAI' ?
                        <div><Form.Check
                            type='radio'
                            label='Read'
                            name='rai'
                            value='read_rai'

                            inline
                            checked={this.state.typeOfAccess['read_rai'.toLowerCase()]}
                            onChange={this.accessHandler}

                        />
                            <Form.Check
                                type='radio'
                                label='Update'
                                name='rai'
                                value='update_rai'
                                inline
                                checked={this.state.typeOfAccess['update_rai'.toLowerCase()]}
                                onChange={this.accessHandler}

                            />
                            <Form.Check
                                type='radio'
                                label='Insert and Update'
                                name='rai'
                                value='insert_update_rai'
                                inline
                                checked={this.state.typeOfAccess['insert_update_rai'.toLowerCase()]}
                                onChange={this.accessHandler}

                            /></div>
                        : this.state.app === 'SCATS' ?
                            <div>
                                <Form.Check
                                    type='checkbox'
                                    label='SCATS'
                                    name='scats'
                                    value='scats'
                                    inline
                                    checked={this.state.typeOfAccess['scats'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='SCATS Traffic Report'
                                    name='scats'
                                    value='SCATS_Traffic_Report'
                                    inline
                                    checked={this.state.typeOfAccess['SCATS_Traffic_Report'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='SCATS History Viewer'
                                    name='scats'
                                    value='SCATS_History_Viewer'
                                    inline
                                    checked={this.state.typeOfAccess['SCATS_History_Viewer'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='Unusual Congestion Viewer'
                                    name='scats'
                                    value='Unusual_Congestion_Viewer'
                                    inline
                                    checked={this.state.typeOfAccess['Unusual_Congestion_Viewer'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='LxListG'
                                    name='scats'
                                    value='LxListG'
                                    inline
                                    checked={this.state.typeOfAccess['LxListG'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                            </div>
                            :
                            <div>
                                <Form.Check
                                    type='checkbox'
                                    label='Monitor All'
                                    name='streams'
                                    value='Monitor_All'
                                    inline
                                    checked={this.state.typeOfAccess['Monitor_All'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='Monitor Limited'
                                    value='Monitor_Limited'
                                    name='streams'
                                    inline
                                    checked={this.state.typeOfAccess['Monitor_Limited'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='Media'
                                    value='Media'
                                    name='streams'
                                    inline
                                    checked={this.state.typeOfAccess['Media'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='Ramp Control'
                                    value='Ramp_Control'
                                    name='streams'
                                    inline
                                    checked={this.state.typeOfAccess['Ramp_Control'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='Ramp Monitoring'
                                    value='Ramp_Monitoring'
                                    name='streams'
                                    inline
                                    checked={this.state.typeOfAccess['Ramp_Monitoring'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='Regional Maint'
                                    value='Regional_Maint'
                                    name='streams'
                                    inline
                                    checked={this.state.typeOfAccess['Regional_Maint'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='Regional Maintenance with DMS'
                                    value='Regional_Maintenance_with_DMS'
                                    name='streams'
                                    inline
                                    checked={this.state.typeOfAccess['Regional_Maintenance_with_DMS'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='Signal Control'
                                    value='Signal_Control'
                                    name='streams'
                                    inline
                                    checked={this.state.typeOfAccess['Signal_Control'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='TMC'
                                    value='TMC'
                                    name='streams'
                                    inline
                                    checked={this.state.typeOfAccess['TMC'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='TMC Support'
                                    value='TMC_Support'
                                    name='streams'
                                    inline
                                    checked={this.state.typeOfAccess['TMC_Support'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='ITS Project'
                                    value='ITS_Project'
                                    name='streams'
                                    inline
                                    checked={this.state.typeOfAccess['ITS_Project'.toLowerCase()]}
                                    onChange={this.accessHandler}
                                />
                            </div>
                    }

                </Form.Group>

            </Form.Row>
            <Form.Group as={Col}>
                <Form.Check label='Onging Access' checked={this.state.isOngoingAccess} onChange={this.checkHandler} />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Requested Date</Form.Label>
                    <DatePicker selected={this.state.requestedDate} dateFormat='dd/MM/yyyy' onChange={(e) => this.dateHandler(e, 'requestedDate')} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Access Start Date</Form.Label>
                    <DatePicker todayButton='Today' minDate={this.state.requestedDate} selected={this.state.accessStartDate} dateFormat='dd/MM/yyyy' onChange={(e) => this.dateHandler(e, 'accessStartDate')} />
                </Form.Group>

            </Form.Row>


            <Form.Row>



                {!this.state.isOngoingAccess && <>
                    <Form.Group as={Col}>
                        <Form.Label>Access End Date</Form.Label>
                        <DatePicker todayButton='today' minDate={this.state.accessStartDate} selected={this.state.accessEndDate} dateFormat='dd/MM/yyyy' onChange={(e) => this.dateHandler(e, 'accessEndDate')} />
                        <span className='bg-info'>Access Period: {this.showAccessPeriod()} months</span>
                    </Form.Group>
                </>}
            </Form.Row>

            {!this.state.isOngoingAccess && <>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Months</Form.Label>
                        <Form.Control type='text' name='months' onChange={this.inputHandler} value={this.state.months} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Weeks</Form.Label>
                        <Form.Control type='text' name='weeks' onChange={this.inputHandler} value={this.state.weeks} />
                    </Form.Group>
                </Form.Row>
            </>}

            <Form.Group>
                <Form.Label>Reminder History</Form.Label>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Content</td>
                            <td>Date</td>
                            <td>Status</td>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.emails.map(item=>{
                            return(<tr>
                                <td>{item.header}</td>·
                                <td>{item.body}</td>
                                <td>{item.date}</td>
                                <td>{item.status}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Form.Group>


            <Button variant='primary' type='submit'>
                Submit
            </Button>

            <Link to='/' className='btn btn-primary'>Cancel</Link>
            {this.state.isSubmitted ? <Redirect to={{
                pathname:'/',
                state:{timeStamp:new Date().getTime()}
            }} /> : null}


        </Form>
    }
}

export default Edit