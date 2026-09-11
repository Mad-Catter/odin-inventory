const pool = require('../models/pool');

async function selectAllWeapons() {
	const results = await pool.query(
		`SELECT * FROM main_table JOIN weapon_types ON main_table.type = weapon_types.type_id`,
	);
	return results.rows;
}
async function selectById(id) {
	const results = await pool.query(
		`SELECT * FROM main_table JOIN weapon_types ON main_table.type = weapon_types.type_id WHERE id = $1`,
		[id],
	);
	return results.rows;
}
async function selectByType(type) {
	const results = await pool.query(
		`SELECT * FROM main_table JOIN weapon_types ON main_table.type = weapon_types.type_id WHERE weapon_types.type = $1`,
		[type],
	);

	return results.rows;
}
async function selectByClass(gameClass) {
	const results = await pool.query(
		`SELECT * FROM main_table JOIN weapon_types ON main_table.type = weapon_types.type_id WHERE class1 = $1 OR class2 = $1`,
		[gameClass],
	);

	return results.rows;
}

module.exports = { selectAllWeapons, selectById, selectByClass, selectByType };
