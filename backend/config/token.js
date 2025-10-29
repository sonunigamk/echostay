import jwt from "jsonwebtoken";

const getToken = async (userId) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("token erro", error);
  }
};
export default getToken;
