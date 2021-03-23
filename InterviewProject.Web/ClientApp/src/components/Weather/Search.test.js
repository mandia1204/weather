import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import Search from './Search';

jest.useFakeTimers();
const flushPromises = () => new Promise(setImmediate);

/** @type {HTMLElement} */
let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    container.remove();
    container = null;
});

test('shows validation message when filter is less than 3 characters', () => {
    const dispatch = jest.fn();

    act(() => {
        ReactDOM.render(<Search dispatch={dispatch} />, container);
    });

    const element = container.querySelector('.search-input');
    
    act(() => {
        element.value = 'AB';
        ReactTestUtils.Simulate.change(element);
    });

    const errorElement = container.querySelector('.error');
    expect(errorElement.textContent).toBe('Enter at least 3 characters'); 
});

test('dispatches SEARCH_COMPLETED when it just found 1 location', async () => {
    const dispatch = jest.fn();
    const forecasts = [
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
        }
    ];
    jest.spyOn(global, "fetch").mockImplementation((p) => {
        const response = p === 'weatherforecast/location/search/lima' ? [{
            "title": "Lima",
            "woeid": 418440
        }] : forecasts;
        return Promise.resolve({
            json: () => Promise.resolve(response)
        })}
    );

    act(() => {
        ReactDOM.render(<Search dispatch={dispatch} />, container);
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

    expect(dispatch).toHaveBeenCalledWith({ type: 'SEARCH_COMPLETED', forecasts, location: 'Lima'})
});

test('shows location list when there are more than 1 location', async () => {
    const dispatch = jest.fn();
    jest.spyOn(global, "fetch").mockImplementation((p) => {
        return Promise.resolve({
            json: () => Promise.resolve([{
                "title": "London",
                "woeid": 1234
            }, {
                "title": "Barcelona",
                "woeid": 12345
            }])
        })}
    );

    act(() => {
        ReactDOM.render(<Search dispatch={dispatch} />, container);
    });

    const element = container.querySelector('.search-input');
    
    act(() => {
        element.value = 'lon';
        ReactTestUtils.Simulate.change(element);
    });

    act(() => {
        jest.advanceTimersByTime(500);
    });

    await flushPromises();

    const listItems = container.querySelectorAll('.location-list-item');
    expect(listItems.length).toBe(2);

    expect(listItems[0].textContent).toBe('London');

});