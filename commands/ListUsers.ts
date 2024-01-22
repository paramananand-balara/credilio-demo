import { BaseCommand } from '@adonisjs/core/build/standalone'
import User from 'App/Models/User'

export default class ListUsers extends BaseCommand {
  public static commandName = 'list:users'
  public static description = 'List all users'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run () {
    const users = await User.all()
    console.log(users)
  }
}
