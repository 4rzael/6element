// autogenerated by sql-generate v1.0.0 on Mon Jun 01 2015 10:10:14 GMT+0200 (CEST)

var sql = require('sql');


/**
 * SQL definition for public.affluence_sensor_measurements
 */
exports.affluence_sensor_measurements = sql.define({
	name: 'affluence_sensor_measurements',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' },
		{ name: 'id' },
		{ name: 'sensor_id' },
		{ name: 'signal_strengths' },
		{ name: 'measurement_date' }
	]
});


/**
 * SQL definition for public.lifecycle
 */
exports.lifecycle = sql.define({
	name: 'lifecycle',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' }
	]
});


/**
 * SQL definition for public.recycling_centers
 */
exports.recycling_centers = sql.define({
	name: 'recycling_centers',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' },
		{ name: 'id' },
		{ name: 'name' },
		{ name: 'lat' },
		{ name: 'lon' }
	]
});


/**
 * SQL definition for public.sensors
 */
exports.sensors = sql.define({
	name: 'sensors',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' },
		{ name: 'id' },
		{ name: 'name' },
		{ name: 'installed_at' }
	]
});

