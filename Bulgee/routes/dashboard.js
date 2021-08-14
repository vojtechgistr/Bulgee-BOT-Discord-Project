const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('dashboard', { pageTitle: 'Dashboard - Bulgee ⟨Advanced Discord Bot⟩', user: req.session.user || null });
});

module.exports = router;