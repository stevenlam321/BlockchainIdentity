import { check, validationResult } from 'express-validator';
const validation = {
  createOrganizationRules:[
    check('id').exists(),
    check('name').exists(),
  ], 
  createPersonRules:[
    check('email').exists().isEmail(),
  ], 
    loginRules:[
        check('username').exists().withMessage((value,{req})=>req.__('username.required')),
        check('password').exists().withMessage((value,{req})=>req.__('password.required'))
    ],
    registerRules : [
        check('username').exists().withMessage((value,{req})=>req.__('username.required')),
        check('password').exists().withMessage((value,{req})=>req.__('password.required'))
        .isLength({min:8}).withMessage((value,{req})=>req.__('password.min_length')),
        check('confirm_password').exists().withMessage((value,{req})=>req.__('confirm_password.required'))
        .custom((value, { req }) => value === req.body.password).withMessage((value,{req})=>req.__('password.not_match'))
      ],
      changePasswordRules : [
        check('password').exists().withMessage((value,{req})=>req.__('password.required'))
        .isLength({min:8}).withMessage((value,{req})=>req.__('password.min_length')),
        check('confirm_password').exists().withMessage((value,{req})=>req.__('confirm_password.required'))
        .custom((value, { req }) => value === req.body.password).withMessage((value,{req})=>req.__('password.not_match'))
      ]
};

export default validation;