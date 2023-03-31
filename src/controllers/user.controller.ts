import { Request, Response} from 'express'
import User, { IUser } from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import bcrypt from "bcrypt"

function createToken(user: IUser) {
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400 //24 horas o 1 dia
    });
}

//controlador de registro

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({msg: 'Please, send your username and password'})
    }
    
    const user = await User.findOne({username: req.body.username});
    console.log(req.body)
    if(user) {
        return res.status(400).json({msg: 'The user already exist'});
    }
    //guardar usuario
    const Newuser = new User(req.body);
    await Newuser.save();
    return res.status(201).json({Newuser, msg:'User registered succesfully', token: createToken(Newuser)});
}

//controlador de login

export const signIn = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({msg: 'Please, send your username and password'})
    }

    const user = await User.findOne({username: req.body.username})
    if(!user) {
        return res.status(400).json({msg: 'The user dont exist'});
    }
    const isMatch = await user.comparePassword(req.body.password)
    if (isMatch) {
        return res.status(200).json({token: createToken(user), user})
    }

    return res.status(400).json({
        msg: 'The user or password are incorrect'
    });
}