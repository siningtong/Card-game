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
          .then(() => {
            return db.query(`
            INSERT INTO creator_hand (card_id, colour, value, image_url)
            SELECT id, colour, value, image_url
            FROM cards 
            ORDER BY random() 
            LIMIT 7
            RETURNING *;
            `)
            .then((response) => {
              return response.rows
            })
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
    return {
        getAllGames,
        newGame,
        joinGame
    }
}