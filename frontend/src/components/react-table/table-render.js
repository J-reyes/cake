import React, { Component } from 'react';
import { render } from 'react-dom';
import { makeData } from './table-data';

import Center from 'react-center';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';

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
        };
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
        const { data } = this.state;
        const xAxis = this.grab("timeStamp", data);
        const yAxis = this.grab("flagged", data);



        const tableData = this.createCoordinates(xAxis, yAxis);
        // console.log("line 58:", tableData);
        this.sortByTime(tableData, 'x');
        console.log(tableData[0].x);

        fakeData.times = tableData.map(data => {
            let val = data.x;
            return val;
        })

        fakeData.labels = tableData.map(data => {
            let val = data.y;
            return val;
        })

        // const testData = [{x: 5, y: 'd'}, {x: 3, y: 'b'}, {x: 4, y: 'c'}]
        // this.sortByTime(testData, 'x');
        // console.log(testData);


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
                <Center>
                    <div id="register" style={{ marginBottom: 50 }} >
                        <Link to="/" >
                            <button className="btn btn-danger btn-lg">Log Out</button>
                        </Link>
                    </div>
                </Center>
            </div>
        )
    }
}

export default TableRender;