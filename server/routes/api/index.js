var router = require('express').Router();

router.use('/user', require('./user'));
router.use('/friend', require('./friend'));
router.use('/jam', require('./jam'));
router.use('/comment', require('./comment'));
router.use('/media', require('./media'));

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }
  if (err.name === 'SequelizeValidationError') {
    if (err.errors.length == 1) {
      res.status(500).send(err.errors[0].message);
      return;
    }
    res.status(500).send(err.errors.map(x => x.message));
    return;
  }
  res.status(500).send(process.env.environement == 'development' ? err : '');
});
module.exports = router;