import React from 'react'
import "./WeatherCard.css"

const WeatherCard = ({ children }) => {
    return (
        <div className='weather_card'>{children}</div>
    )
}

export default WeatherCard