import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { makeData } from './table-data';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { Line } from 'react-chartjs-2';



const fakeData = {
    times: [],
    labels: []
}

const range = length => {
    const array = [];
    for (let i = 0; i < length; i++) {
        array.push(i);
    }
    return array;
}


class TableRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: makeData(),
            flagged: false
        };
    }

    componentDidMount() {
        var token = localStorage.bearer
        axios.get("http://localhost:3000/users/tokencheck", {
            'headers': {
                'authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                console.log(res);
                if (res.data.success === true) {
                    console.log('token success: ' + res.data.success);
                }
                else {
                    console.log('token success: ' + res.data.success);
                    this.setState({ flagged: true });
                }
            })
            .catch(err => {
                this.setState({ flagged: true });
                console.log(err);
            })
    }

    grab = (attribute, data) => data.map(d => d[attribute]);

    createCoordinates = (xArray, yArray) =>
        range(xArray.length).map((item, index) => ({
            x: xArray[index],
            y: yArray[index]
        }));

    sortByTime = (array, key) => {
        return array.sort((a, b) => {
            let x = a[key];
            let y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        })
    }

    render() {
        if (this.state.flagged) {
            return (
                <Redirect to="/badtoken" />
            )
        }

        const { data } = this.state;
        const xAxis = this.grab("timeStamp", data);
        const yAxis = this.grab("flagged", data);



        const tableData = this.createCoordinates(xAxis, yAxis);

        this.sortByTime(tableData, 'x');
        // console.log(tableData[0].x);

        fakeData.times = tableData.map(data => {
            let val = data.x;
            return val;
        })

        fakeData.labels = tableData.map(data => {
            let val = data.y;
            return val;
        })



        return (
            <div>
                <Line
                    data={{
                        labels: fakeData.times,
                        datasets: [
                            {
                                label: 'My First dataset',
                                backgroundColor: 'rgba(255,99,132,0.2)',
                                borderColor: 'rgba(255,99,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                hoverBorderColor: 'rgba(255,99,132,1)',
                                data: fakeData.labels
                            }
                        ]
                    }}

                />
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: "Flag",
                            accessor: "flagged"
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
                        },
                        {
                            Header: "Cookies",
                            accessor: "cookies"
                        }

                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        )
    }
}

export default TableRender;