const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	id_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: true,
		required: true,
	},
	firstname: {
		type: String,
	},
	surname: {
		type: String,
	},
	phone: {
		type: String,
	}
}, {
	timestamps: true
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = { Profile };