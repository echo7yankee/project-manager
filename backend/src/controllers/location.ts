export {};

const { locationDao } = require("../databaseStorage/daos");
const dao = locationDao;

exports.getUserLocation = async (req, res) => {
  const { id } = req.params;

  try {
    const location = await dao.findById(id);
    return res.status(200).json(location);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
