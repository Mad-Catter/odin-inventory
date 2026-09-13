const queries = require('./queries');
const { weaponImagePaths } = require('../models/original_data');
const { body, validationResult, matchedData } = require('express-validator');

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
		weaponImagePaths,
	});
};
const validateForm = [
	body('name')
		.trim()
		.isLength({
			min: 1,
			max: 30,
		})
		.withMessage('invalid name'),
	body('price').isInt({ min: 0, max: 99999 }).withMessage('invalid price'),
	body('quantity').isInt({ min: 0, max: 99999 }).withMessage('invalid quantity'),
	body('image')
		.custom((value) => weaponImagePaths.includes(value))
		.withMessage('invalid image'),
	body('tier').isInt({ min: 1, max: 3 }).withMessage('invalid tier'),
	body('type').isInt({ min: 1, max: 5 }).withMessage('invalid type'),
];

const postCreate = [
	validateForm,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('create', {
				title: `Ye Olde Shoppe | Create`,
				weaponImagePaths,
				errors,
			});
		}
		const { name, price, quantity, image, tier, type } = matchedData(req);
		await queries.createWeapon(name, price, quantity, image, tier, type);
		res.redirect('/');
	},
];

module.exports = { getIndex, getDetails, getCreate, postCreate };
