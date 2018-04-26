import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { makeData } from './table-data';

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

class FakeDataChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: makeData()
        }
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

        // Sorts time
        this.sortByTime(tableData, 'x');


        fakeData.times = tableData.map(data => {
            let val = data.x;
            return val;
        })

        fakeData.labels = tableData.map(data => {
            let val = data.y;
            return val;
        })


        return (
            
            <Bar
                data={{
                    labels: fakeData.times,
                    datasets: [
                        {
                            label: 'Fraud Index per Day',
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
        )
    }
}

export default FakeDataChart;

