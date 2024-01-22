import { BaseCommand } from '@adonisjs/core/build/standalone'
import Profile from 'App/Models/Profile'


export default class ListProfiles extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'list:profiles'
  public static description = 'List all Profiles'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run () {
    const profile = await Profile.all()
    console.log(profile)
  }
}