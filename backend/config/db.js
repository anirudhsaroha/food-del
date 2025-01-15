import pg from 'pg'

export const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "Vishu2006!",
    port: 5432,
});
