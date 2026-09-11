const queries = require('./queries');

const getIndex = async (req, res) => {
	const weapons = await queries.selectAllWeapons();
	res.render('index', {
		weapons,
		title: 'Ye Olde Shoppe',
	});
};
const getDetails = async (req, res) => {
	const { weaponId } = req.params;
	const weapon = await queries.selectById(weaponId);
	res.render('details', {
		weapon,
		title: `Ye Olde Shoppe | ${weapon.name} Details`,
	});
};
const getCreate = (req, res) => {
	res.render('create', {
		title: `Ye Olde Shoppe | Create`,
	});
};

module.exports = { getIndex, getDetails, getCreate };
