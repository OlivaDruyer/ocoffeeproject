const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");
const UserMapper = require("../userMapper");
const database = require("../database");

const userMapper = new UserMapper(database);

const authController = {
  async renderSignupPage(req, res) {
    res.render("pages/signup");
  },

  async renderSigninPage(req, res) {
    res.render("pages/signin");
  },

  async registerUser(req, res) {
    try {
      const { firstname, lastname, email, password, confirmation } = req.body;

      if (!firstname || !lastname || !email || !password || !confirmation) {
        return res.status(400).render("pages/signup", { errorMessage: "Tous les champs sont obligatoires." });
      }

      if (!emailValidator.validate(email)) {
        return res.status(400).render("pages/signup", { errorMessage: "Le format de l'email fourni n'est pas valide." });
      }

      if (password !== confirmation) {
        return res.status(400).render("pages/signup", { errorMessage: "Le mot de passe et sa confirmation ne correspondent pas." });
      }

      const passwordSchema = new passwordValidator()
        .is().min(12)
        .has().uppercase()
        .has().lowercase()
        .has().digits(1);

      if (!passwordSchema.validate(password)) {
        return res.status(400).render("pages/signup", { errorMessage: "Le mot de passe doit contenir plus de 12 caractères, dont un chiffre, une majuscule et une minuscule." });
      }

      const alreadyExistingUser = await userMapper.findOneByEmail(email);

      if (alreadyExistingUser) {
        return res.status(409).render("pages/signup", { errorMessage: "L'email fourni est déjà utilisé." });
      }

      const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await userMapper.createUser(firstname, lastname, email, hashedPassword);
      console.log(`Utilisateur créé: ID=${newUser.id}, Email=${newUser.email}, Name=${newUser.name}`);

      res.render("pages/signin", { successMessage: "Compte utilisateur créé avec succès. Veuillez à présent vous authentifier." });

    } catch (error) {
      console.log(error);
      res.status(500).render("500");
    }
  }
};

module.exports = authController;
