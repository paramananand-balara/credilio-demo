
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
 
Route.post('/register/', 'AuthController.register').as('auth.register')
Route.post('/login/', 'AuthController.login').as('auth.login')

 Route.post("/user/profile", "ProfileController.create");
 Route.put("/user/profile", "ProfileController.update");
 Route.get("/user/profile", "ProfileController.show");
 Route.delete("/user/profile", "ProfileController.destroy");
