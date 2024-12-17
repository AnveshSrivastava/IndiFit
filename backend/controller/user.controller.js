import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { name, age, gender, email, phone, password } = req.body;

    // Validate incoming data
    if (!name || !age || !gender || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if phone number is valid (only digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Phone number must be 10 digits!" });
    }

    console.log("Received data:", req.body);

    // Hash the password
    const hashpassword = await bcryptjs.hash(password, 10);
    console.log("Hashed password:", hashpassword);

    // Check if the user already exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Create a new user
    const createuser = new User({
      name,
      age,
      gender,
      email: email.toLowerCase(),
      phone,
      password: hashpassword,
    });

    // Save the new user to the database
    await createuser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Trim the inputs to remove any leading/trailing spaces
    email = email.trim();
    password = password.trim();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the entered password with the stored hash
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid admission number or password" });
    }


    else{
    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
    });
  }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};