const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'elon-musk', 'elonIsTheGoat', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = sequelize.import('models/CurrencyShop');
sequelize.import('models/Users');
sequelize.import('models/UserItems');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Slave', cost: 10 }),
		CurrencyShop.upsert({ name: 'Member', cost: 50 }),
		CurrencyShop.upsert({ name: 'Priority Member', cost: 100 }),
		CurrencyShop.upsert({ name: 'VIP', cost: 500 }),
		CurrencyShop.upsert({ name: 'MVP', cost: 2000 }),
		CurrencyShop.upsert({ name: 'Moderator', cost: 5000 }),
		CurrencyShop.upsert({ name: 'Admin', cost: 20000 }),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);

// To reset stats/coins and items use 'node dbInit.js --force' or 'node dbInit.js -f'
// I suggest maybe once a month or two months
// The economy setup is only for the official elon musk bot server