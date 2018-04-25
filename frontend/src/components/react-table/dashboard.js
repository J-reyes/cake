import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { makeData } from './table-data';


import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';

import { Line } from 'react-chartjs-2';

import FakeDataChart from './test-chart';

const range = length => {
    const array = [];
    for (let i = 0; i < length; i++) {
        array.push(i);
    }
    return array;
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            flagged: false,
            chartData: {
                day: [],
                fraudIndex: []
            }
        };
    }

    getChartData() {
        axios.post("http://localhost:3000/data/byday", {
            startDate: "04/04/2018",
            endDate: "04/11/2018"
        }).then(res => {
            const data = res.data;
            const days = Object.keys(data);
            const fraudRatio = Object.values(data).map(day => day.fraudRatio * 100)

            this.setState({
                chartData: {
                    day: days,
                    fraudIndex: fraudRatio,
                }
            });
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    // Gives token before receiving data from data-api
    getData() {
        var token = localStorage.bearer;
        axios.get("http://localhost:3000/data/", {
            'headers': {
                'authorization': 'Bearer ' + token
            }
        }).then(res => {
            this.setState({ data: res.data });
        }).catch(err => {
            console.log(err);
        })
    }

    // Checks token before rendering page
    componentDidMount() {
        var token = localStorage.bearer;
        axios.get("http://localhost:3000/users/tokencheck", {
            'headers': {
                'authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.data.success === true) {
                console.log('token success: ' + res.data.success);
            }
            else {
                console.log('token success: ' + res.data.success);
                this.setState({ flagged: true });
            }
        }).catch(err => {
            this.setState({ flagged: true });
            console.log(err);
        })
        this.getData();
        this.getChartData();
    }

    render() {
        if (this.state.flagged) {
            return (
                <Redirect to="/" />
            )
        }

        return (
            <div>
                {/* <NavBar /> */}
                <div className="container navbar row">
                    <div className="col-sm-6 h1"> Fake Cake </div>
                    <button
                        className="btn btn-info pull-right"
                        style={{ marginTop: '1.5em' }}
                        onClick={e => {
                            localStorage.removeItem('bearer');
                            this.componentDidMount();
                        }} >Log Out</button>
                </div>
                {/* Chartjs */}
                <Line
                    data={{
                        labels: this.state.chartData.day,
                        datasets: [
                            {
                                label: 'Fraud Index per Day',
                                backgroundColor: 'rgba(255,99,132,0.2)',
                                borderColor: 'rgba(255,99,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                hoverBorderColor: 'rgba(255,99,132,1)',
                                data: this.state.chartData.fraudIndex
                            }
                        ],

                    }}
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 100
                                }
                            }]
                        }
                    }}

                />
                {/* <FakeDataChart /> */}
                {/* React Table */}
                <ReactTable
                    data={this.state.data}
                    columns={[
                        {
                            Header: "Fraud",
                            accessor: "fraud"
                        },
                        {
                            Header: "TimeStamp",
                            accessor: "timeStamp"
                        },
                        {
                            Header: "Campaign",
                            accessor: "campaign"
                        },
                        {
                            Header: "Affiliate",
                            accessor: "affiliate"
                        },
                        {
                            Header: "User Agent",
                            accessor: "userAgent"
                        },
                        {
                            Header: "Location",
                            accessor: "location"
                        },
                        {
                            Header: "IP Address",
                            accessor: "ipAddress"
                        }

                    ]}
                    defaultPageSize={50}
                    className="-striped -highlight"
                />
            </div>
        )
    }
}

export default Dashboard;
