const _ = require('lodash');

const { Profile } = require('../models/profile');

// Get the list of all profiles
const allProfiles = async (req, res) => {
	try {
		const profiles = await Profile.find({}).exec();

		return res.status(200).send({
			status: "success",
	    	data: profiles.length > 0 ? profiles : 'No profile found.',
		});

	} catch (error) {
		const errorMessage = error ? error.message : "Oops! Error occured when fetching profiles from database";
		res.status(400).send({
			status: "error",
			data: errorMessage
		});
	}
};

// Get the profile associated with the logged in user
const getProfile = async (req, res) => {
	try {
		const profile = await Profile.findOne({id_user: req.user._id}).exec();

		return res.status(200).send({
			status: "success",
	   		data: profile ? profile : 'No profile found for this user.',
		});
	} catch (error) {
		const errorMessage = error ? error.message : "Oops! Error occured when fetching profile from database";
		res.status(400).send({
			status: "error",
			data: errorMessage
		});
	}
};

// Create a new profile
const createProfile = async (req, res) => {
	try {
		const body = _.pick(req.body, ['firstname', 'surname', 'phone']);
		const profile = new Profile({ id_user: req.user._id, ...body});

		await profile.save().then(result => {
			return res.status(201).send({
				status: "success",
				data: result,
			});
		});
	} catch (error) {
		const errorMessage = error ? error.message : "Oops! Error occured when creating a new profile";
		return res.status(400).send({
			status: "error",
			data: errorMessage
		});
	}
};

// Update profile
const editProfile = async (req, res) => {
	try {
		const body = _.pick(req.body, ['firstname', 'surname', 'phone']);

		await Profile.findOneAndUpdate(
			{ id_user: req.user._id },
			{ $set: body },
			{ useFindAndModify: false, new: true }
		).then((result) => {
			return res.status(200).send({
				status: "success",
				data: result,
			});
		});
	} catch (error) {
		const errorMessage = error ? error.message : "Oops! Error occured when editing the profile";
		return res.status(400).send({
			status: "error",
			data: errorMessage
		});
	}
};

// Delete profile
const deleteProfile = async (req, res) => {
	try {
		await Profile.findOneAndRemove(
			{ id_user: req.user._id },
			{useFindAndModify: false}
		).then(() => {
			return res.status(200).send({
				status: "success",
				data: "Profile deleted successfully",
			});
		});

	} catch (error) {
		const errorMessage = error ? error.message : "Oops! Error occured when deleting the profile";
		return res.status(400).send({
			status: "error",
			data: errorMessage
		});
	}
};

module.exports = { allProfiles, createProfile, getProfile, editProfile, deleteProfile }