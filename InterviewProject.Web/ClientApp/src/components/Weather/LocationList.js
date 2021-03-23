import React from 'react';

export const LocationList = ({locations, onLocationSelected}) => {
    return (
        <div className="location-list">
            <div className="title">Select location:</div>
            <div className="location-list-items">
            {locations.map(location => 
                <div className="location-list-item" key={location.woeid} onClick={(e)=> onLocationSelected(location)}>{location.title}</div>                    
            )}
            </div>
        </div>
    );
}