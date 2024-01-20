import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Hash from "@ioc:Adonis/Core/Hash";
import User from "App/Models/User";
import AuthValidator from "App/Validators/AuthValidator";

export default class AuthController {
  public async register({ request, auth, response }: HttpContextContract) {
    try {
      const data = await request.validate(AuthValidator);

      const hashedPassword = await Hash.make(data.password);
      data.password = hashedPassword;

      const user = await User.create(data);
      const token = await auth.use("api").generate(user);

      return response.json({ token });
    } catch (error) {
      console.error(error);

      if (error.message) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async login({ request, auth, response }: HttpContextContract) {
    try {
      const { email, password } = request.all();

      const user = await User.findBy("email", email);
      if(!user) throw new Error("User not found");
      const isPasswordValid = await Hash.verify(user.password, password);

      if (!isPasswordValid) {
        throw new Error("Incorrect Password!");
      }

      const token = await auth.use("api").generate(user);

      return response.json({ token });
    } catch (error) {
      console.error(error);

      if (error.message) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.logout();

      return response.json({ message: "Logout successful" });
    } catch (error) {
      console.error(error);

      if (error.message) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }
}
