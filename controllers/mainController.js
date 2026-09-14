const queries = require('./queries');
const { weaponImagePaths } = require('../models/original_data');
const { body, query, validationResult, matchedData } = require('express-validator');
const { loadEnvFile } = require('node:process');
if (process.env.NODE_ENV !== 'production') {
	process.loadEnvFile();
}
const password = process.env.EDIT_PASSWORD;

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
const getEdit = [
	query('password')
		.trim()
		.custom((submittedPassword) => {
			return submittedPassword === password;
		}),
	async (req, res) => {
		const error = validationResult(req);
		const { weaponId } = req.params;
		const weapon = await queries.selectById(weaponId);
		if (!error.isEmpty()) {
			return res.status(400).render('details', {
				weapon,
				title: `Ye Olde Shoppe | ${weapon.name} Details`,

				error: true,
			});
		} else {
			return res.render('edit-weapon', {
				weapon,
				title: `Ye Olde Shoppe | ${weapon.name} Alteration`,
				weaponImagePaths,
			});
		}
	},
];

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

const updateEdit = [
	validateForm,
	async (req, res) => {
		const errors = validationResult(req);
		const { weaponId } = req.params;
		const weapon = await queries.selectById(weaponId);
		if (!errors.isEmpty()) {
			return res.render('edit-weapon', {
				weapon,
				title: `Ye Olde Shoppe | ${weapon.name} Alteration`,
				weaponImagePaths,
				errors,
			});
		}

		const { name, price, quantity, image, tier, type } = matchedData(req);
		await queries.updateWeapon(weaponId, [name, price, quantity, image, tier, type]);
		res.redirect(`/details/${weaponId}`);
	},
];
const deleteWeapon = async (req, res) => {
	console.log('HERE HERE HERE');
	const { weaponId } = req.params;
	await queries.deleteWeapon(weaponId);
	return res.redirect('/');
};

module.exports = { getIndex, getDetails, getCreate, postCreate, getEdit, updateEdit, deleteWeapon };
