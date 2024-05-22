import AdminController from '../controllers/admin-controller'
import Route from './route'

import { authenticated } from '../middlewares/auth-handler'

class AdminRoute extends Route {
  private readonly adminController = new AdminController()

  constructor () {
    super()
    this.setRoutes()
  }

  protected setRoutes (): void {
    this.router.get('/admin/users', authenticated,
      this.adminController.getAllUser.bind(this.adminController)
    )
  }
}

export default AdminRoute
