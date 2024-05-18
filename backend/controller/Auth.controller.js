//authantication controllerimport crypto from "crypto";
const bcrypt = require("bcrypt");
const User = require("../model/Auth/Auth.model");
const nodemailer = require("nodemailer");

const saltRounds = 10;

// Function to generate a random token
const generateToken = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
  const tokenLength = 64; // Adjust the token length as needed

  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
};
const userSignup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check if user already exists
  const checkUser = await User.findOne({
    $or: [{ name: name }, { email: email }],
  });

  if (checkUser) {
    if (checkUser.name === name) {
      return res.status(409).json({ message: "Username already exists" });
    } else {
      return res.status(409).json({ message: "Email already exists" });
    }
  } else {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      return res.status(201).json({ msg: "Successfully signed up" });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal server error");
    }
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordMatch) {
      // Passwords match
      // Generate JWT token from user model
      const token = user.generateAuthToken();

      res.setHeader("Authorization", `Bearer ${token}`);
      user.tokens = token;
      await user.save();
      return res.status(200).json({ msg: "Login successful",user });
    } else {
      // Passwords don't match
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
const userLogout = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const user = await User.findOne({ 'tokens': token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the token from the user's tokens array
    user.tokens = null;
    await user.save();

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
const sendResetEmail = async (emailAddress, resetToken) => {
  try {
    // Construct reset password link
    const encodedToken = encodeURIComponent(resetToken);
    const url = `http://localhost:8080/reset-password/?token=${encodedToken}`;

    // Create a transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // SMTP server hostname
      port: 587, // Port for secure SMTP (TLS) connection
      secure: false, // true for 465, false for other ports
      auth: {
        user: "vanessabewe@gmail.com", // Your email username
        pass: "pxme opdi iwlh fvcn", // Your email password
      },
    });

    // Send email with reset password link
    await transporter.sendMail({
      from: "Procurement System<vanessabewe@gmail.com>",
      to: emailAddress,
      subject: "Reset Your Password",
      html: `
        <p>Hello,</p>
        <p>You have requested to reset your password. Please click the link below to reset your password:</p>
        <p><a href="${url}">${url}</a></p>
        <p>If you did not request this, you can safely ignore this email.</p>
      `,
    });

    console.log("Reset password email sent successfully.");
  } catch (error) {
    console.error("Error sending reset password email:", error.message);
    throw error;
  }
};

// Function to reset password

// Function to handle forgot password request
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = generateToken();
    user.resetToken = resetToken;
    console.log(user.resetToken);
    user.resetTokenExpiration = Date.now() + 900000; // Token expires in 1 hour
    await user.save();

    // Send reset password email
    await sendResetEmail(email, resetToken);

    return res.status(200).json({ message: "Reset password email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body; // Access passwords from request body
  //const token = req.query.token; // Access token from query parameters
  const decodedToken = decodeURIComponent(req.query.token);
  try {
    const user = await User.findOne({ email: email }); // Find user by reset token

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.resetToken !== decodedToken) {
      return res.status(404).json({ message: "Invalid token" });
    }
    if (user.resetTokenExpiration < Date.now()) {
      return res.status(401).json({ message: "Reset token has expired" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = { forgotPassword, resetPassword, userSignup, userLogin,userLogout };
