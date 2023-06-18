import User from "../models/userModel.js";

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUserFriends = async (req, res, next) => {

  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // We're going to make multiple api calls to database that's why we're using promise.all
    const friends = await Promise.all(
      user.friends.map(id => User.findById(id))
    );
    const formattedFriends = friends.map(({
      _id,
      firstName,
      lastName,
      email,
      picturePath,
      location,
      occupation,
    })=> {
  return {
    _id,
    firstName,
    lastName,
    email,
    picturePath,
    location,
    occupation,
  };
})
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const addRemoveFriends = async (req, res, next) => {

  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);

    const friend = await User.findById(friendId);
    
    // Removing friend if exists
    if (user.friends.includes(friend)) {
      user.friends = user.friends.filter(id => id !== friendId)
      friend.friends = friend.friends.filter(id => id !== id)
      
    }

    user.friends.push(friendId)
    friends.friends.push(id)

    await user.save();
    await friend.save();

    // formatting friends
    const friends = await Promise.all(
      user.friends.map(id => User.findById(id))
    );
    const formattedFriends = friends.map(({
      _id,
      firstName,
      lastName,
      email,
      picturePath,
      location,
      occupation,
    }) => {
      return {
        _id,
        firstName,
        lastName,
        email,
        picturePath,
        location,
        occupation,
      };
    })
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}