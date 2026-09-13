class Weapon {
	constructor(name, price, quantity, img, tier, type) {
		this.name = name;
		this.price = price;
		this.quantity = quantity;
		this.img = img;
		this.tier = tier;
		this.type = type;
	}
}

class WeaponType {
	constructor(name, class1, class2 = null) {
		this.name = name;
		this.class1 = class1;
		this.class2 = class2;
	}
}

const weapon_types = [
	new WeaponType('sword', 'fighter'),
	new WeaponType('double_axe', 'barbarian'),
	new WeaponType('mace', 'cleric', 'fighter'),
	new WeaponType('single_axe', 'barbarian', 'fighter'),
	new WeaponType('staff', 'wizard', 'cleric'),
];
const weapons = [
	// Swords
	new Weapon('Iron Sword', 10, 15, '/weapon_images/swords/iron_sword.png', 1, 1),
	new Weapon('Steel Sword', 20, 10, '/weapon_images/swords/steel_sword.png', 1, 1),
	new Weapon('Iron Katana', 15, 5, '/weapon_images/swords/iron_katana.png', 1, 1),
	new Weapon('Steel Katana', 30, 5, '/weapon_images/swords/steel_katana.png', 1, 1),
	new Weapon('Steel Greatsword', 40, 4, '/weapon_images/swords/steel_greatsword.png', 1, 1),

	new Weapon('Vampire Sword', 75, 3, '/weapon_images/swords/vampire_sword.png', 2, 1),
	new Weapon('Spider Sword', 65, 4, '/weapon_images/swords/spider_sword.png', 2, 1),
	new Weapon('Crystal Sword', 90, 2, '/weapon_images/swords/crystal_sword.png', 2, 1),

	new Weapon('Ghost Flame', 150, 2, '/weapon_images/swords/ghost_flame.png', 3, 1),
	new Weapon('Storms Wrath', 175, 1, '/weapon_images/swords/storms_wrath.png', 3, 1),

	// Staffs
	new Weapon('Amber Staff', 15, 12, '/weapon_images/staffs/amber_staff.png', 1, 5),
	new Weapon('Emerald Staff', 20, 10, '/weapon_images/staffs/emerald_staff.png', 1, 5),
	new Weapon('Ruby Staff', 25, 8, '/weapon_images/staffs/ruby_staff.png', 1, 5),

	new Weapon('Void Staff', 80, 4, '/weapon_images/staffs/void_staff.png', 2, 5),
	new Weapon('Ice Staff', 70, 5, '/weapon_images/staffs/ice_staff.png', 2, 5),

	new Weapon('Zephyrs Wings', 160, 2, '/weapon_images/staffs/zephyrs_wings.png', 3, 5),
	new Weapon('Darkwoods Lord', 185, 1, '/weapon_images/staffs/darkwoods_lord.png', 3, 5),

	// Single Axes
	new Weapon('Iron Single Axe', 12, 14, '/weapon_images/single_axes/iron_single_axe.png', 1, 4),
	new Weapon('Steel Single Axe', 25, 9, '/weapon_images/single_axes/steel_single_axe.png', 1, 4),

	new Weapon('Onyx Single Axe', 70, 3, '/weapon_images/single_axes/onyx_single_axe.png', 2, 4),
	new Weapon('Emerald Single Axe', 85, 2, '/weapon_images/single_axes/emerald_single_axe.png', 2, 4),

	// Double Axes
	new Weapon('Steel Double Axe', 45, 6, '/weapon_images/double_axes/steel_double_axe.png', 2, 2),
	new Weapon('Blood Double Axe', 95, 3, '/weapon_images/double_axes/blood_double_axe.png', 2, 2),

	new Weapon('Night and Day', 180, 1, '/weapon_images/double_axes/night_and_day.png', 3, 2),

	// Maces
	new Weapon('Iron Mace', 15, 13, '/weapon_images/maces/iron_mace.png', 1, 3),

	new Weapon('Gold Mace', 35, 7, '/weapon_images/maces/gold_mace.png', 2, 3),
	new Weapon('Silver Mace', 30, 8, '/weapon_images/maces/silver_mace.png', 2, 3),

	new Weapon('Lord Inferno', 165, 2, '/weapon_images/maces/lord_inferno.png', 3, 3),
	new Weapon('Lady Frost', 155, 2, '/weapon_images/maces/lady_frost.png', 3, 3),
];

// I should maybe make this into another table in the database.
const weaponImagePaths = [
	'/weapon_images/swords/iron_sword.png',
	'/weapon_images/swords/steel_sword.png',
	'/weapon_images/swords/iron_katana.png',
	'/weapon_images/swords/steel_katana.png',
	'/weapon_images/swords/steel_greatsword.png',
	'/weapon_images/swords/vampire_sword.png',
	'/weapon_images/swords/spider_sword.png',
	'/weapon_images/swords/crystal_sword.png',
	'/weapon_images/swords/ghost_flame.png',
	'/weapon_images/swords/storms_wrath.png',

	'/weapon_images/staffs/amber_staff.png',
	'/weapon_images/staffs/emerald_staff.png',
	'/weapon_images/staffs/ruby_staff.png',
	'/weapon_images/staffs/void_staff.png',
	'/weapon_images/staffs/ice_staff.png',
	'/weapon_images/staffs/zephyrs_wings.png',
	'/weapon_images/staffs/darkwoods_lord.png',

	'/weapon_images/single_axes/iron_single_axe.png',
	'/weapon_images/single_axes/steel_single_axe.png',
	'/weapon_images/single_axes/onyx_single_axe.png',
	'/weapon_images/single_axes/emerald_single_axe.png',

	'/weapon_images/double_axes/steel_double_axe.png',
	'/weapon_images/double_axes/blood_double_axe.png',
	'/weapon_images/double_axes/night_and_day.png',

	'/weapon_images/maces/iron_mace.png',
	'/weapon_images/maces/gold_mace.png',
	'/weapon_images/maces/silver_mace.png',
	'/weapon_images/maces/lord_inferno.png',
	'/weapon_images/maces/lady_frost.png',
];
module.exports = { weapon_types, weapons, weaponImagePaths };
