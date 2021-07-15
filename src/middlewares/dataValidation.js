import { check, validationResult } from "express-validator";

export const userDataValidation = [

    check('nickname', 'Name must be +4 chars and -15 chars' )
    .isLength({min:4,max:15})
    .not()
    .isEmpty(),

    check('name', 'Nickname must be +4 chars and -15 chars')
    .isLength({min:4,max:15})
    .not()
    .isEmpty(),

    check('email', 'Not valid Email')
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail()
    ,

    check('phonenumber', 'number is not valid')
    .isNumeric()
    ,

    check('password', 'Password must be +4 chars and contain a number')
    .isLength({min:4,max:25})
    .not()
    .isEmpty()
    .matches(/\d/)
,

(req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()})

    next()
}

]