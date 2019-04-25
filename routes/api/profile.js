//user information: like location, education, expreience

const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load validation
const validateProfileInput = require("../../validation/profile");
const validatePropertyInput = require("../../validation/property");
const validateEducationInput = require("../../validation/education");

//Load Profile model
const Profile = require("../../models/Profile");
//Load user model
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "profile works" }));

//This is a route that checks the current user's profile
// @route GET api/profile
// @desc create a protected route that get the current user's profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route GET api/profile/all
// @desc get all profiles
// @access Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @route GET api/profile/handle/:handle. This is a backend api, in the front end, it would be api/profile/grace. The/handle will be hidden
// @desc get profile by handle
// @access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route GET api/profile/user/:user_id.
// @desc get profile by user_id
// @access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

//This is a post request for creating or undating a profile
// @route POST api/profile
// @desc create or update user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.firstName) profileFields.firstName = req.body.firstName;
    if (req.body.middleName) profileFields.middleName = req.body.middleName;
    if (req.body.lastName) profileFields.lastName = req.body.lastName;

    if (req.body.dateOfBirth) profileFields.dateOfBirth = req.body.dateOfBirth;
    req.body.income
      ? (profileFields.income = req.body.income)
      : (profileFields.income = "1");
    req.body.expenses
      ? (profileFields.expenses = req.body.expenses)
      : (profileFields.expenses = "0");
    //profileFields.expenses = "300";

    // Partner
    profileFields.partner = {};
    req.body.partnerIncome
      ? (profileFields.partner.partnerIncome = req.body.partnerIncome)
      : (profileFields.partner.partnerIncome = "0");
    req.body.partnerExpenses
      ? (profileFields.partner.partnerExpenses = req.body.partnerExpenses)
      : (profileFields.partner.partnerExpenses = "0");

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          res.json(profile);
        });
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That user name already exists";
            res.status(400).json(errors);
          }
          // Save Profile
          new Profile(profileFields)
            .save()
            .then(profile => {
              //res.json(profileFields);
              res.json(profile);
            })
            .catch(err => {
              res.json(err);
            });
        });
      }
    });
  }
);

// @route POST api/profile/property
// @desc add property to profile
// @access Private
router.post(
  "/property",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePropertyInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newPro = {
        propertyValue: req.body.propertyValue,
        deposit: req.body.deposit,
        postCode: req.body.postCode
      };

      // Add to exp array
      profile.property.unshift(newPro);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route POST api/profile/education
// @desc add education to profile
// @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route DELETE api/profile/property/:expe_id
// @desc delete property from profile
// @access Private
router.delete(
  "/property/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.property
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //Splice out of array
        profile.property.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/profile/education/:edu_id
// @desc delete property from profile
// @access Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //Splice out of array
        profile.education.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/profile
// @desc delete user and profile
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
