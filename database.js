











const startnewGame = function() {
	let userQuery = `
	INSERT INTO games(creator_id)
	VALUES($1)
	RETURNING *;
	`
	return db.pool.query(userQuery)
	.then (res => res.rows)
	.catch(err => null)
		
}

exports.startNewGame = startNewGame;