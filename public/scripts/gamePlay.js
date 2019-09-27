module.exports = (db) => {
    let playerHand = [];

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

    // const startingCards = (cards) => {
    //     const hand = cards.slice(-7);
    //     playerHand.push(...hand);
    //     return playerHand;
    // }

    const drawCard = (cards) => {
        let numCards = -7;
        if(playerHand.length) {
            numCards = -1;
        }
        const card = cards.slice(numCards);
        playerHand.push(...card);
        return playerHand
    }

    return {
        getAllGames,
        newGame,
        getDeck,
        // startingCards,
        drawCard
    }
}