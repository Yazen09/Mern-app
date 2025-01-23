const {check,validationResult}=require("express-validator");
exports.registerValidator=()=>[
    check("Firstname","veuiller inserer votre Prenon!!").not().isEmpty(),
    check("Name","veuiller inserer votre Nom!!").not().isEmpty(),
    check("Email","veuiller inserer votre mail!!").isEmail(),
    check("Password","veuiller inserer votre mot de pass!!").isLength({min:8})
    ]
exports.loginValidator=()=>[
    check("Email","veuiller inserer votre mail!!").isEmail(),
    check("Password","veuiller inserer votre Prenon!!").isLength({min:8})
    ]
exports.Validation=(req,res,next)=>{
        const errors=validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        next()
    }   