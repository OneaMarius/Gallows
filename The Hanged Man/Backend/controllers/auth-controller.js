const HttpError = require("../models/http-error");

const User = require("../models/user-model");
const bcrypt = require('bcryptjs')



async function signup(req, res, next) {

   const { name, email, password} = req.body;
   console.log(req.body,name, email, password);
   if (password.length < 4) {
      return next(new HttpError("Password to short", 401));
   }
   let AuthUserList;
   try {
      AuthUserList = await User.find();
   } catch (error) {
      return next(new HttpError("Something went wrong", 500));
   }
   const emailExist = AuthUserList.find((u) => u.email === email);
   if (emailExist) {
      return next(new HttpError("Email already exist", 401));
   }
   
   let hashPassword;
   try {
      hashPassword = await bcrypt.hash(password, 12) 
   } catch (error) {
      return next(new HttpError("Could not create user, please try again", 500));
   }
   

   const newUser = new User({
      name,
      email,
      password:hashPassword,
      score: 0,
      win: 0,
      lose: 0,
      games: 0,
      rate: 0,
   });
   try {
      await newUser.save();
   } catch (error) {
      const err = new HttpError("User signup failed, pls try again", 500);
      return next(err);
   }
   console.log('new user created: ',newUser.name);
   res.status(200).json({ login: true, user: newUser });
}

async function login(req, res, next) {

   const { email, password } = req.body;
   let AuthUserList;
   try {
      AuthUserList = await User.find();
   } catch (error) {
      return next(new HttpError("Something went wrong", 500));
   }
   if (AuthUserList.length === 0) {
      return next(new HttpError("Empty Database", 404));
   }
   const user = AuthUserList.find((u) => u.email === email);
   if (!user) {
      return next(new HttpError("Wrong email", 401));
   }
   let validPassword = false;
   validPassword = await bcrypt.compare(password, user.password);

   if (!validPassword) {
      return next(new HttpError("Wrong password", 401));
   }
   res.status(200).json({ login: true, user: user });
}

async function getAuthUsers(req, res, next) {
   let AuthUserList;
   try {
      AuthUserList = await User.find();
   } catch (error) {
      return next(new HttpError("Something went wrong", 500));
   }
   if (AuthUserList.length === 0) {
      return next(new HttpError("No users found in database", 404));
   }
   res.json({
      userList: AuthUserList.map((user) =>
         user.toObject({ getters: true })
      ),
   });
}



const updateUserScore = async (req, res, next) => {
   const { userId, userScore, win, lose } = req.body;
   console.log(userId, userScore, win, lose);
   let user;
   try {
      user = await User.findById(userId);
   } catch (error) {
      return next(new HttpError("Something went wrong", 500));
   }
   if (!user) {
      const error = new HttpError("Could not find a user with this id.", 404);
      return next(error);
   }

   user.score = userScore;
   user.win = win;
   user.lose = lose;
   user.games = +win + +lose;
   let rate = 0;
   if (lose == 0) {
      rate = +win + 1;
   } else {
      rate = win / lose
   }
   user.rate = rate.toFixed(3);

   try {
      await user.save();
   } catch (err) {
      return next(new HttpError("Something went wrong on user.save", 500));
   }
   res.status(200).json(user);
};



module.exports = {
   login,
   signup,
   getAuthUsers,
   updateUserScore,
 
};
