const User = require("../models/User");

exports.deleteUser = async (req, res) => {
  try {
    console.log("req body", req.body);
    const {id} = req.body;
    if (!id) {
      console.log("no id recieved...");
      return res.status(400).json({
        status: 400,
        message: "Please get id",
      });
    }
    const user = await User.findByIdAndDelete({_id:id});
    return res.status(200).json({
      status: 201,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};


