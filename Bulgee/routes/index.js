const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Bulgee ⟨Advanced Discord Bot⟩', user: req.session.user || null });
});

module.exports = router;