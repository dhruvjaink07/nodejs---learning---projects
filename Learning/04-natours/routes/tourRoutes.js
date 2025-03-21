const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const router = express.Router();

// router.param('id',tourController.checkID);
router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getALlTours);

router.route('/tour-stats').get(tourController.tourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect,tourController.getALlTours)
  .post(authController.protect,tourController.createTour);
router
  .route('/:id')
  .get(authController.protect,tourController.getTour)
  .patch(authController.protect,tourController.updateTour)
  .delete(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.deleteTour);

module.exports = router;
