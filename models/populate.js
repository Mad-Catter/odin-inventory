const { Client } = require('pg');
const { weapons, weapon_types } = require('./original_data');
const { loadEnvFile } = require('node:process');
if (process.env.NODE_ENV !== 'production') {
	process.loadEnvFile();
}

const CREATE_TYPE_TABLE = `
    CREATE TABLE IF NOT EXISTS weapon_types(
      type_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      type VARCHAR (255),
      class1 VARCHAR (255),
      class2 VARCHAR (255)
    );
`;
const INSERT_INTO_TYPES = `INSERT INTO weapon_types (type, class1, class2) VALUES ($1, $2, $3);`;

const CREATE_MAIN_TABLE = `
    CREATE TABLE IF NOT EXISTS main_table(
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR (255), 
      price INTEGER,
      quantity INTEGER,
      img TEXT,
      tier INTEGER,
      type INTEGER REFERENCES weapon_types(type_id)
    );`;
const INSERT_INTO_MAIN = `
    INSERT INTO main_table (name, price, quantity, img, tier, type) VALUES ($1, $2, $3, $4, $5, $6);
`;
const DELETE_TABLES = `
    DROP TABLE IF EXISTS main_table;
    DROP TABLE IF EXISTS weapon_types`;

async function populate(reset = false) {
	console.log('beginning seeding');
	const client = new Client({
		connectionString: process.env.CONNECTION_STRING,
	});
	await client.connect();
	if (reset) {
		console.log('deleting tables');
		await client.query(DELETE_TABLES);
	}
	console.log('creating weapon type table');
	await client.query(CREATE_TYPE_TABLE);
	console.log('inserting into weapon_types');
	for (const type of weapon_types) {
		await client.query(INSERT_INTO_TYPES, [type.name, type.class1, type.class2]);
	}
	console.log('making main table');
	await client.query(CREATE_MAIN_TABLE);
	console.log('inserting into main table');
	for (const weapon of weapons) {
		await client.query(INSERT_INTO_MAIN, [
			weapon.name,
			weapon.price,
			weapon.quantity,
			weapon.img,
			weapon.tier,
			weapon.type,
		]);
	}
	console.log('finished inserting, ending connection.');
	client.end();
}
populate(true);
module.exports = { populate };
