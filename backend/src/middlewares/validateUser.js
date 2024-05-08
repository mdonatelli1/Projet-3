const validateUser = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  // Regex d'une adresse email standard
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  // Si l'adresse email n'est pas déclarée
  if (email == null) {
    errors.push({ field: "email", message: "The field 'email' is required" });
    // Sinon, et si l'adresse email n'est pas conforme au Regex
  } else if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }

  if (password == null) {
    errors.push({
      field: "password",
      message: "The field 'password' is required",
    });
  } else if (
    !(
      /.{8}/.test(password) &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[#$@!%*?&]/.test(password)
    )
  ) {
    errors.push({ field: "password", message: "Invalid password" });
  }

  // Si il y a au moins 1 erreur dans le tableau d'erreurs
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateUser;
