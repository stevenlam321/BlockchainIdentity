import { check, validationResult,checkSchema } from 'express-validator';
const validation = {
  createOrganizationRules:[
    check('id').exists().withMessage('id is required'),
    check('name').exists().withMessage('name is required'),
    check('logo').exists().withMessage('logo is required'),
  ], 
  updateOrganizationRules:[
    check('name').exists().withMessage('name is required'),
    check('logo').exists().withMessage('logo is required'),
  ], 
  createAttributeRules:[
    check('id').exists().withMessage('id is required'),
    check('name').exists().withMessage('name is required'),
  ], 
  updateAttributeRules:[
    check('name').exists().withMessage('name is required'),
  ], 
  registerRules:[
    check('email').exists().withMessage('email is required')
    .isEmail().withMessage('Invalid email'),
    check('password').exists().withMessage('password is required'),
    check('mobile').exists().withMessage('mobile is required'),
  ], 
  loginRules:[
    check('email').exists().withMessage('email is required')
    .isEmail().withMessage('Invalid email'),
    check('password').exists().withMessage('password is required')
  ], 
  createCredentialRules:[
    check('id').exists().withMessage('id is required'),
    check('name').exists().withMessage('name is required'),
    check('attribute_ids').exists().withMessage('attribute_ids is required')
    .isArray().withMessage('attribute_ids should be an array'),
  ],
  addCredentialAttributeRules:[
    check('id').exists().withMessage('id is required'),
    check('name').exists().withMessage('name is required'),
    check('organization_id').exists().withMessage('organization_id is required')
  ],
  assignCredentialRules:[
    check('email').exists().withMessage('email is required'),
    check('credential_id').exists().withMessage('credential_id is required'),
    check('attribute_values').exists().withMessage('attribute_values is required')
  ],
  createApplicationRules:[
    check('name').exists().withMessage('name is required'),
    check('public_key').exists().withMessage('public_key is required'),
  ],
  updateApplicationRules:[
    check('name').exists().withMessage('name is required'),
    check('public_key').exists().withMessage('public_key is required'),
  ],
  createApplicationRequestRules:[
    check('app_id').exists().withMessage('app_id is required'),
    check('credentials').exists().withMessage('credentials is required')
    .isArray().withMessage('credentials must be an array')
  ],
  applicationRequestInfoRules:[
    check('app_id').exists().withMessage('app_id is required'),
    check('person_id').exists().withMessage('app_id is required'),
    check('credentials').exists().withMessage('credentials is required')
    .isArray().withMessage('credentials must be an array')
  ],
  changePasswordRules : [
    check('password').exists().withMessage((value,{req})=>req.__('password.required'))
    .isLength({min:8}).withMessage((value,{req})=>req.__('password.min_length')),
    check('confirm_password').exists().withMessage((value,{req})=>req.__('confirm_password.required'))
    .custom((value, { req }) => value === req.body.password).withMessage((value,{req})=>req.__('password.not_match'))
  ]
};

export default validation;