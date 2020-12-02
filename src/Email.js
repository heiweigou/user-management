import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Col, Inpu } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { format, compareAsc, addMonths, addWeeks, differenceInCalendarMonths } from 'date-fns'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'

class Email extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            incidents: [],
            header: 'this is a header',
            body: 'this is a body'
        }

        this.inputHandler=this.inputHandler.bind(this)
    }

    inputHandler(e){
        let {value,name}=e.target
        this.setState({
            [name]:value
        })
    }

    render() {
        return (
            <div className='overflow-auto'>
                <Form onSubmit={e => {
                    let data = this.state
                    data.incidents = this.props.incidents
                    fetch('/email', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }

                    })
                }}>
                    <Form.Group>

                        <Form.Label>
                            Recepients:
                            </Form.Label>
                        <Form.Control as='select' multiple>
                            {this.props.incidents.map((item,index) => {
                                return (<option key={index}>
                                    {item.email}
                                </option>)
                            })}

                        </Form.Control>



                    </Form.Group>

                    <Form.Group>

                        <Form.Label>
                            Title:
                            </Form.Label>
                        <Form.Control value={this.state.header} onChange={this.inputHandler} name='header'/>

                    </Form.Group>
                    <Form.Group>

                        <Form.Label>
                            Content:
                            </Form.Label>
                        <Form.Control value={this.state.body} onChange={this.inputHandler} name='body'/>

                    </Form.Group>
                    <Button type='submit' variant='primary' >Send</Button>
                </Form>
            </div>
        )
    }
}

export default Email