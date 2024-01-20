import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Profile from "App/Models/Profile";
import ProfileValidator from "App/Validators/ProfileValidator";

export default class ProfileController {
  public async create({ request, auth, response }: HttpContextContract) {
    try {
      const data = await request.validate(ProfileValidator);

      const user = await auth.use("api").authenticate();
      await user.load("profile");
      if (user?.profile) throw new Error("Profile is already available");

      await Profile.create(data);

      return response.json({ message: "Profile created successfully" });
    } catch (error) {
      console.error(error);

      if (error.message) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async update({ auth, request, response }: HttpContextContract) {
    try {
      const user = await auth.use("api").authenticate();
      const data = await request.validate(ProfileValidator);

      await user?.load("profile");

      const profile = user?.profile;

      if (!profile) throw new Error("Profile not found");
      profile.merge(data);
      await profile.save();

      return response.json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error(error);

      if (error.message) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async show({ auth, response }: HttpContextContract) {
    try {
      const user = await auth.use("api").authenticate();

      if (!user) throw new Error("Unauthorized");

      await user.load("profile");

      const profile = user?.profile;

      if (!profile) throw new Error("Profile not found");
      return response.json({
        name: profile.name,
        gender: profile.gender,
        dateOfBirth: profile.dateOfBirth,
      });
    } catch (error) {
      console.error(error);

      if (error.message) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async destroy({ auth, response }: HttpContextContract) {
    try {
      const user = await auth.use("api").authenticate();

      if (!user) throw new Error("Unauthorized");

      await user.load("profile");

      const profile = user?.profile;

      if (profile) {
        await profile.delete();
      }

      await user.delete();

      return response.json({
        message: "Profile and user deleted successfully",
      });
    } catch (error) {
      console.error(error);

      if (error.message) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }
}
