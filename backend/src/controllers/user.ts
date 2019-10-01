export {};

const { userDao } = require("../databaseStorage/daos");
const dao = userDao;

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await dao.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
