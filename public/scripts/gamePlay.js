module.exports = (db) => {
    const getAllGames = () => {
        return db.query(`
        SELECT *
        FROM games
        ORDER BY id;
        `)
        .then((response) => {
            return response.rows
        })
    }

    const newGame = (userID) => {
        return db.query(`
            INSERT INTO games (creator_id)
            VALUES($1);`, [userID])
        .then((response) => {
            return response.rows
        })
    }

    const getDeck = () => {
        return db.query(`
            SELECT * 
            FROM cards
            ORDER BY random();
        `)
        .then((response) => {
            return response.rows
        })
    }

    return {
        getAllGames,
        newGame,
        getDeck
    }
}