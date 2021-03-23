import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { Weather } from './Weather';

jest.useFakeTimers();

/** @type {HTMLElement} */
let container;

const flushPromises = () => new Promise(setImmediate);

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    container.remove();
    container = null;
});

test('renders and display empty results', () => {
    act(() => {
        ReactDOM.render(<Weather />, container);
    });

    const element = container.querySelector('.search-input');
    expect(element.nodeValue).toBe(null);
    expect(element.getAttribute('placeholder')).toBe('enter location');

    const weatherTableRowsCount =  container.querySelectorAll('.weather-list tbody tr').length;
    expect(weatherTableRowsCount).toBe(0);
});

test('displays search results', async () => {
    jest.spyOn(global, "fetch").mockImplementation((p) => {
        const response = p === 'weatherforecast/location/search/lima' ? [{
            "title": "Lima",
            "woeid": 418440
        }] : 
        [
            {
                "id": 6065044468006912,
                "state": "Heavy Cloud",
                "date": "3/22/2021",
                "temperatureC": 25,
                "temperatureF": 76,
                "stateAbbr": "hc"
            },
            {
                "id": 5873667973054464,
                "state": "Heavy Cloud",
                "date": "3/23/2021",
                "temperatureC": 25,
                "temperatureF": 76,
                "stateAbbr": "hc"
            },
        ];
        return Promise.resolve({
            json: () => Promise.resolve(response)
        })}
    );

    act(() => {
        ReactDOM.render(<Weather />, container);
    });

    const element = container.querySelector('.search-input');

    act(() => {
        element.value = 'lima';
        ReactTestUtils.Simulate.change(element);
    });

    act(() => {
        jest.advanceTimersByTime(500);
    });

    await flushPromises();

    const weatherTableRowsCount =  container.querySelectorAll('.weather-list tbody tr').length;
    expect(weatherTableRowsCount).toBe(2);

    
});