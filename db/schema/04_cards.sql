DROP TABLE IF EXISTS cards CASCADE;
CREATE TABLE cards (
  id SERIAL PRIMARY KEY NOT NULL,
  colour VARCHAR(10) NOT NULL,
  value VARCHAR(255) NOT NULL,
  image_url VARCHAR(255)
);
