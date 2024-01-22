import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Profile from "App/Models/Profile";
import ProfileValidator from "App/Validators/ProfileValidator";

export default class ProfileController {
  public async create({ request, auth, response }: HttpContextContract) {
    try {
      const data : any = await request.validate(ProfileValidator);

      const user = await auth.use("api").authenticate();
      await user.load("profile");
      if (user?.profile) throw new Error("Profile is already available");

      await Profile.create(data);

      return response.json({ success: true, message: "Profile created successfully" });
    } catch (error) {
      

      if (error.message) {
        return response.status(400).json({success: false, message: error.message });
      }
      return response.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  public async update({ auth, request, response }: HttpContextContract) {
    try {
      const user = await auth.use("api").authenticate();
      const data : any = await request.validate(ProfileValidator);

      await user?.load("profile");

      const profile = user?.profile;

      if (!profile) throw new Error("Profile not found");
      profile.merge(data);
      await profile.save();

      return response.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
      

      if (error.message) {
        return response.status(400).json({ success: false, message: error.message });
      }
      return response.status(500).json({ success: false, message: "Internal Server Error" });
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
        success: true, data: {
          name: profile.name,
          gender: profile.gender,
          dateOfBirth: profile.dateOfBirth,
        }
      });
    } catch (error) {
      

      if (error.message) {
        return response.status(400).json({ success: false, message: error.message });
      }
      return response.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  public async destroy({ auth, response }: HttpContextContract) {
    try {
      const user : any = await auth.use("api").authenticate();

      if (!user) throw new Error("Unauthorized");

      await user.token?.revoke();

      await user.load("profile");

      const profile = user?.profile;

      if (profile) {
        await profile.delete();
      }

      await user.delete();

      return response.json({ success: true, 
        message: "Profile and user deleted successfully",
      });
    } catch (error) {
      

      if (error.message) {
        return response.status(400).json({ success: false, message: error.message });
      }
      return response.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
}
