const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const { login, register } = require('../controllers/auth');
const { allProfiles, createProfile, getProfile, editProfile, deleteProfile } = require('../controllers/profile');

const router = express.Router();

// DOCUMENTATION ROUTE
router.get('/', async (req, res) => {
  res.redirect('/docs');
});

// PROFILE ROUTE
router.get('/profiles', async (req, res) => {
  await allProfiles(req, res);
});

router.get('/profile', authenticate, async (req, res) => {
  await getProfile(req, res);
});

router.post('/profile/create', authenticate, async (req, res) => {
  await createProfile(req, res);
});

router.patch('/profile/edit', authenticate, async (req, res) => {
  await editProfile(req, res);
});

router.delete('/profile/delete', authenticate, async (req, res) => {
  await deleteProfile(req, res);
});


// AUTHENTICATION ROUTE
router.post('/login',  async (req, res) => {
  await login(req, res);
});

router.post('/register',  async (req, res) => {
  await register(req, res);
});

module.exports = router;