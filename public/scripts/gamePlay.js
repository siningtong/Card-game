module.exports = (db) => {
    const getAllGames = () => {
        return db.query(`
        SELECT *
        FROM games
        ORDER BY id;
        `)
        .then ((response) => {
            return response.rows
        })
    }

    const newGame = (userID) => {
        return db.query(`
            INSERT INTO games (creator_id)
            VALUES($1);`, [userID])
        .then(() => {
            return db.query(`
                INSERT INTO creator_hand (card_id, colour, value, image_url)
                SELECT id, colour, value, image_url
                FROM cards 
                ORDER BY random() 
                LIMIT 7
                RETURNING *;`)
        })
        .then((response) => {
            return response.rows
        })
    }

    const joinGame = (userID, gameID) => {
        return db.query(`
            UPDATE games
            SET opponent_id = $1
            WHERE id = $2
            RETURNING *;
        `, [userID, gameID])
        .then(() => {
            return db.query(`
            INSERT INTO opponent_hand (card_id, colour, value, image_url)
            SELECT id, colour, value, image_url
            FROM cards
            WHERE playable = true
            ORDER BY random() 
            LIMIT 7
            RETURNING *;
            `)
        })
        .then((response) => {
            return response.rows
        })
    }

    const updateCards = () => {
        return db.query(`
            UPDATE cards
            SET playable = false
            FROM creator_hand
            WHERE card_id = cards.id;
        `)
        .then((response) => {
            return response.rows
        }) 
    }

    const updateCards1 = () => {
        return db.query(`
            UPDATE cards
            SET playable = false
            FROM opponent_hand
            WHERE card_id = cards.id;
        `)
        .then((response) => {
            return response.rows
        }) 
    }

    return {
        getAllGames,
        newGame,
        joinGame,
        updateCards,
        updateCards1
    }
}