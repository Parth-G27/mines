import User from '../models/User.js';

export const createOrUpdateUser = async (req, res) => {
  const { email, name, image } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user
      user.name = name;
      user.image = image;
      console.log("user updated", user.name);
      await user.save();
    } else {
      // Create new user
      user = new User({
        email,
        name,
        image,
      });
      console.log("new user created", user);
      await user.save();
    }

    res.status(200).json({ message: 'User created/updated successfully', user });
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    res.status(500).json({ message: 'Error creating/updating user' });
  }
};
