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
          VALUES($1)`, [userID])
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
        .then ((response) => {
            return response.rows
        })
    }

    const updateHand = () => {
        return db.query(`
            UPDATE cards
            SET playable = false
            FROM creator_hand
            WHERE cards.id = card_id
            RETURNING *;        
        `)
        .then ((response) => {
            return response.rows
        })
    }

    const updateUser = (userID) => {
        return db.query(`
        select * from users
        join games
          on  users.id = creator_id 
          and case 
                when $1 = creator_id
                  then 1 
                else 0 
               end = 1;
        `, [userID])
        .then ((response) => {
            return response.rows
        })
    }

    return {
        getAllGames,
        newGame,
        joinGame,
        updateHand,
        updateUser
    }
}