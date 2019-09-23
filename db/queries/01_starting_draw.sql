INSERT INTO creator_hand (card_id)
SELECT id
FROM cards 
ORDER BY random() 
LIMIT 7;

UPDATE cards
SET playable = false
FROM creator_hand
WHERE cards.id = card_id;

INSERT INTO opponent_hand (card_id)
SELECT id
FROM cards
WHERE playable = true
ORDER BY random()
LIMIT 7;

UPDATE cards
SET playable = false
FROM creator_hand
WHERE cards.id = card_id;