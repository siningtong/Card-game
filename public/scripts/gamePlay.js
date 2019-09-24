module.exports = (db) => {
    const startingHand = () => {
        return db.query(`
        INSERT INTO creator_hand (card_id)
        SELECT id
        FROM cards 
        ORDER BY random() 
        LIMIT 7;
    `)
    .then ((response) => {
        return response.rows
    })
    .catch (err => console.log(err))
    };
    return {
        startingHand
    }
}