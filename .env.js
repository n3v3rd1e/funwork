module.exports = {
	NODE_ENV: JSON.stringify(process.env.NODE_ENV),
	APP_ENV: process.env.APP_ENV || 'dev',
	DEFAULT_LOCALE: process.env.DEFAULT_LOCALE || 'en'
}