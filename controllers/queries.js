const pool = require('../models/pool');

async function selectAllWeapons() {
	const results = await pool.query(
		`SELECT * FROM main_table JOIN weapon_types ON main_table.type = weapon_types.type_id;`,
	);
	return results.rows;
}
async function selectById(id) {
	const results = await pool.query(
		`SELECT * FROM main_table JOIN weapon_types ON main_table.type = weapon_types.type_id WHERE id = $1;`,
		[id],
	);
	return results.rows[0];
}
async function selectByType(type) {
	const results = await pool.query(
		`SELECT * FROM main_table JOIN weapon_types ON main_table.type = weapon_types.type_id WHERE weapon_types.type = $1;`,
		[type],
	);

	return results.rows;
}
async function selectByClass(gameClass) {
	const results = await pool.query(
		`SELECT * FROM main_table JOIN weapon_types ON main_table.type = weapon_types.type_id WHERE class1 = $1 OR class2 = $1;`,
		[gameClass],
	);

	return results.rows;
}

async function createWeapon(weaponName, weaponPrice, weaponQuantity, weaponImg, weaponTier, weaponType) {
	const results = await pool.query(
		`
		INSERT INTO main_table (name, price, quantity, img, tier, type) VALUES ($1, $2, $3, $4, $5, $6);
	`,
		[weaponName, weaponPrice, weaponQuantity, weaponImg, weaponTier, weaponType],
	);
	return results;
}

async function updateWeapon(id, updates) {
	const result = await pool.query(
		`UPDATE main_table SET name = $1, price = $2, quantity = $3, img = $4, tier = $5, type = $6 WHERE id = $7 `,
		[...updates, id],
	);
	return result;
}

async function deleteWeapon(id) {
	const results = await pool.query(
		`
		DELETE FROM main_table WHERE id = $1;`,
		[id],
	);
	return id;
}

module.exports = {
	selectAllWeapons,
	selectById,
	selectByClass,
	selectByType,
	createWeapon,
	updateWeapon,
	deleteWeapon,
};
