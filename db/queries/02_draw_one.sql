INSERT INTO creator_hand (card_id)
SELECT id 
FROM cards
WHERE playable = TRUE
ORDER BY random()
LIMIT 1;

UPDATE cards
SET playable = false
FROM creator_hand
WHERE cards.id = card_id;