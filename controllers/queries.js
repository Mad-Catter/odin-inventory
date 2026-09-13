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
	const values = Object.values(updates);
	const keys = Object.keys(updates);
	// This next part was google ai.
	if (keys.length === 0) return; // Nothing to update

	// Map keys to 'column_name = $index' format
	const setClause = keys.map((key, index) => `"${key}" = $${index + 1}`).join(', ');
	// The last parameter will be the id for the WHERE clause
	const query = `UPDATE users SET ${setClause} WHERE id = $${keys.length + 1};`;
	// Combine column values with the WHERE clause ID
	const queryParams = [...values, id];
	// Execute using your db client
	const result = await db.query(query, queryParams);
	return result;
}

async function deleteWeapon(id) {
	const results = await pool.query(
		`
		DELETE * FROM main_table WHERE id = $1;`,
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
