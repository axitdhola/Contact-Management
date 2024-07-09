const express = require('express');
const { createContact, getContacts, updateContact, deleteContact } = require('../controllers/contactController');
const authenticateUser = require('../middleware/authentication');   
const router = express.Router();

router.use(authenticateUser);

router.get('/', getContacts)
router.post('/', createContact)
router.put('/:id', updateContact)
router.delete('/:id', deleteContact)

module.exports = router;
