DROP TABLE IF EXISTS creator_hand CASCADE;
CREATE TABLE creator_hand (
    id serial primary key not null,
    card_id integer references cards(id),
    in_play BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS opponent_hand CASCADE;
CREATE TABLE opponent_hand (
    id serial primary key not null,
    card_id integer references cards(id),
    in_play BOOLEAN DEFAULT FALSE
);


