import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

import { pool } from './database.js'

const createTablesQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(500),
        image VARCHAR(500)
    );

    CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time TIME,
        image VARCHAR(500),
        location_id INTEGER REFERENCES locations(id)
    );
`

const seedLocationsQuery = `
    INSERT INTO locations (name, address, image) VALUES
    ('Echo Lounge & Music Hall', '1515 S Lamar Blvd, Dallas, TX', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600'),
    ('House of Blues', '2200 N Lamar St, Dallas, TX', 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600'),
    ('The Pavilion at Toyota Music Factory', '316 W Las Colinas Blvd, Irving, TX', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600'),
    ('American Airlines Center', '2500 Victory Ave, Dallas, TX', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600');
`

const seedEventsQuery = `
    INSERT INTO events (title, date, time, image, location_id) VALUES
    ('Jazz Night Live', '2025-12-15', '19:00', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600', 1),
    ('Indie Rock Showcase', '2026-04-20', '20:00', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600', 1),
    ('Acoustic Sunset Sessions', '2026-05-10', '18:30', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600', 1),
    ('Blues Brothers Tribute', '2025-11-01', '21:00', 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=600', 2),
    ('Gospel Sunday', '2026-04-05', '17:00', 'https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?w=600', 2),
    ('R&B Vibes Night', '2026-06-15', '20:30', 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=600', 2),
    ('Summer Music Festival', '2026-07-04', '16:00', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600', 3),
    ('Country Thunder', '2026-03-22', '19:00', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600', 3),
    ('EDM Extravaganza', '2026-08-18', '22:00', 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600', 3),
    ('Pop Stars Live', '2025-10-30', '20:00', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600', 4),
    ('Hip Hop Homecoming', '2026-05-25', '19:30', 'https://images.unsplash.com/photo-1547355253-ff0740f6e8c1?w=600', 4),
    ('Classical Orchestra Night', '2026-09-12', '18:00', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600', 4);
`

const resetDatabase = async () => {
    try {
        await pool.query(createTablesQuery)
        console.log('Tables created successfully!')

        await pool.query(seedLocationsQuery)
        console.log('Locations seeded!')

        await pool.query(seedEventsQuery)
        console.log('Events seeded!')

        console.log('Database reset complete!')
    } catch (error) {
        console.error('Error resetting database:', error)
    } finally {
        pool.end()
    }
}

resetDatabase()
