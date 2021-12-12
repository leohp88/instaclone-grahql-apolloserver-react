const bcrypjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

function generarToken(user, SECRET_KEY, expiresIn) {
  const { id } = user;
  const payload = { id };
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

async function register(input) {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();
  const { email, username, password } = newUser;
  //Revisamos si el email esta en uso
  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error("El email esta en uso");
  //Revisamos si el usuario existe
  const foundUsername = await User.findOne({ username });
  if (foundUsername) throw new Error("El nombre de usuario ya esta en uso");
  const salt = await bcrypjs.genSalt(10);
  const hash = await bcrypjs.hash(password, salt);
  newUser.password = hash;

  try {
    const user = new User(newUser);
    user.save();
    console.log(user);
    return user;
  } catch (error) {
    console.log("Hay un error", error);
  }
}

async function login(input) {
  const { email, password } = input;
  //Revisamos si el usuario existe
  const foundUser = await User.findOne({ email: email.toLowerCase() });
  if (!foundUser) throw new Error("Error en el email o password");
  const passwordSucces = await bcrypjs.compare(password, foundUser.password);
  if (!passwordSucces) throw new Error("Error en el email o password");
  return { token: generarToken(foundUser, process.env.SECRET_KEY, "24H") };
}
module.exports = {
  register,
  login,
};
