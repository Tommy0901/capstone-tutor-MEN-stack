import RegisterController from '../controllers/register-controller'
import Route from './route'

import { authenticated } from '../middlewares/auth-handler'

class RegisterRoute extends Route {
  private readonly registerController = new RegisterController()

  constructor () {
    super()
    this.setRoutes()
  }

  protected setRoutes (): void {
    this.router.get('/register/all', authenticated,
      this.registerController.getRegistrations.bind(this.registerController)
    )
    this.router.post('/register/:courseId', authenticated,
      this.registerController.postRegistration.bind(this.registerController)
    )
    this.router.put('/register/:courseId', authenticated,
      this.registerController.putRegistration.bind(this.registerController)
    )
    this.router.delete('/register/:courseId', authenticated,
      this.registerController.deleteRegistration.bind(this.registerController)
    )
  }
}

export default RegisterRoute
