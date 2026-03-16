import React, { useState, useEffect } from 'react'
import '../css/Event.css'

const Event = ({ id, title, date, time, image }) => {

    const [formattedDate, setFormattedDate] = useState('')
    const [formattedTime, setFormattedTime] = useState('')
    const [remaining, setRemaining] = useState('')
    const [isPast, setIsPast] = useState(false)

    useEffect(() => {
       
        const dateString = date ? date.split('T')[0] : ''
        const eventDate = new Date(`${dateString}T${time || '00:00'}`)


        setFormattedDate(eventDate.toLocaleDateString('en-US', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
        }))

        if (time) {
            setFormattedTime(eventDate.toLocaleTimeString('en-US', {
                hour: 'numeric', minute: '2-digit', hour12: true
            }))
        }

        const now = new Date()
        const diff = eventDate - now

        if (diff < 0) {
            setIsPast(true)
            setRemaining('This event has passed')
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
            const minutes = Math.floor((diff / (1000 * 60)) % 60)
            setRemaining(`${days}d ${hours}h ${minutes}m remaining`)
        }
    }, [date, time])

    return (
        <article className='event-information' style={isPast ? { opacity: 0.5 } : {}}>
            <img src={image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {formattedDate} <br /> {formattedTime}</p>
                    <p id={`remaining-${id}`} style={isPast ? { color: 'red' } : {}}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
