import Student from "../model/user.model.js";
import bcryptjs from 'bcryptjs';

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { schoolname, adm_no, password } = req.body;

    // Validate incoming data
    if (!schoolname || !adm_no || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if adm_no is valid
    if (adm_no === null || adm_no.trim() === '') {
      return res.status(400).json({ message: "Admission number cannot be null or empty!" });
    }

    // Log incoming data for debugging
    console.log("Received data:", req.body);

    // Hash the password
    const hashpassword = await bcryptjs.hash(password, 10);

    // Check if the user already exists
    const user = await Student.findOne({ adm_no });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Create a new user
    const createuser = new Student({
      schoolname,
      adm_no,
      password: hashpassword,
    });

    // Save the new user to the database
    await createuser.save();

    // Respond with success message
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    // Log the error for debugging
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { adm_no, password } = req.body;

    // Check if the user exists
    const user = await Student.findOne({ adm_no });
    if (!user) {
      return res.status(400).json({ message: "Invalid admission number or password" });
    }

    // Compare the password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid admission number or password" });
    }

    // If login is successful
    res.status(200).json({
      message: "Login successful",
      user: {
        schoolname: user.schoolname,
        adm_no: user.adm_no,
        _id: user._id,
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
