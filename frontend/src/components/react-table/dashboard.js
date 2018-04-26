import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { makeData } from './table-data';


import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';

import { Bar } from 'react-chartjs-2';

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
                startDate: "4/20/2018",
                data: {},
                time: [],
                fraudIndex: []
            },
            renderData: {
                time: [],
                fraudIndex: []
            }
        };
    }

    // 1 Day  = new Date().toLocaleString("en-US", options)
    // 3 Day = endDate = new Date(), startDate = new Date() + 3
    // 7 Day = endDate = new Date(), startDate = new Date + 7
    // 1 month
    // 3 month
    // 6 month
    // 1 year

    dateToday() {
        const date = new Date().toLocaleDateString("en-US");
        return date;
    }

    setStartDate(daysBack) {
        const date = new Date();
        const startDate = new Date();
        startDate.setDate(date.getDate() - daysBack);
        return startDate.toLocaleDateString("en-US");
        // this.setState(
        //     {
        //         chartData: {
        //             ...this.state.chartData,
        //             startDate: startDate.toLocaleDateString("en-US")
        //         }
        //     })
    }

    getChartData() {
        axios.post("http://localhost:3000/data/byday", {
            startDate: this.setStartDate(370),
            endDate: this.dateToday()
        }).then(res => {
            const data = res.data;
            const time = Object.keys(data);
            const fraudRatio = Object.values(data).map(day => day.fraudRatio * 100)

            this.setState({
                chartData: {
                    ...this.state.chartdata,
                    data: res.data,
                    time: time,
                    fraudIndex: fraudRatio,
                }
            });
        }).catch(err => {
            console.log(err);
        })
    }

    getTimeFrame = lengthOfDays => {
        // grabs one week of keys in an array format
        
        let allKeys = Object.keys(this.state.chartData.data);
        let rangeKeys = allKeys.slice(allKeys.length - lengthOfDays, allKeys.length);

        let fraudRatio = Object.values(this.state.chartData.data).map(day => day.fraudRatio * 100);
        let rangeFraud = fraudRatio.slice(fraudRatio.length - lengthOfDays, fraudRatio.length);
        // console.log("ALLKEYS", allKeys);
        // console.log("FRAUDRATIO", rangeFraud);

        this.setState({
            renderData: {
                time: rangeKeys,
                fraudIndex: rangeFraud
            }
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
            this.getTimeFrame(3);
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
                < div className="container navbar row" >
                    <div className="col-sm-6 h1"> Fake Cake </div>
                    <button
                        className="btn btn-info pull-right"
                        style={{ marginTop: '1.5em' }}
                        onClick={e => {
                            localStorage.removeItem('bearer');
                            this.componentDidMount();
                        }} >Log Out</button>
                </div >
                {/* Chartjs */}
                < div className="container button-row" >
                    <button 
                        className="btn btn-default" 
                        onClick={e => this.getTimeFrame(3)}
                        >Last 3 Days</button>
                    <button 
                        className="btn btn-default" 
                        onClick={e => this.getTimeFrame(7)}
                        >Last Week</button>
                    <button 
                        className="btn btn-default" 
                        onClick={e => this.getTimeFrame(30)}
                        >Month</button>
                    <button 
                        className="btn btn-default" 
                        onClick={e => this.getTimeFrame(365)}
                        >Year</button>
                </div >
                <Bar
                    data={{
                        labels: this.state.renderData.time,
                        datasets: [
                            {
                                label: 'Fraud Index per Day',
                                backgroundColor: 'rgba(255,99,132,0.2)',
                                borderColor: 'rgba(255,99,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                hoverBorderColor: 'rgba(255,99,132,1)',
                                data: this.state.renderData.fraudIndex
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
            </div >
        )
    }
}

export default Dashboard;
