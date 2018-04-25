import React, { Component } from 'react';
import namor from 'namor';
import '../../../public/css/styles.css';

//returns an array with length defined
const range = length => {
    const array = [];
    for (let i = 0; i < length; i++) {
        array.push(i);
    }
    return array;
}

const randomTime = () => {
    var rTime = new Date(null);
    rTime.setSeconds(Math.floor(Math.random() * 9999));
    return rTime.toISOString().substr(11, 8);
}

//random object generator
const newClick = () => {
    const flaggedChance = Math.random();
    return {
        flagged: flaggedChance < 0.14 ? 1 : 0,
        timeStamp: randomTime(),
        campaign: namor.generate({ words: 1, numbers: 0 }),
        affiliate: namor.generate({ words: 1, numbers: 0 }),
        userAgent: namor.generate({ words: 1, numbers: 0 }),
        location: namor.generate({ words: 2, numbers: 0 }),
        ipAddress: Math.floor(Math.random() * 99999999),
        cookies: namor.generate({ words: 1, numbers: 0 })
    }
}

//return an array of newClick objects with length that is defined
export const makeData = (length = 100) => 
    range(length).map(d => newClick());

