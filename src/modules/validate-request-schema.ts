import { validationResult } from "express-validator";


export const validateRequestSchema = (req, res, next) => {
    
    const errors = validationResult(req);
    //console.log(errors);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next()
}