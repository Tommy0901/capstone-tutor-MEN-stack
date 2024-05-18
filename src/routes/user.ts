import { type RequestHandler } from 'express'

import UserController from '../controllers/user-controller'
import Route from './route'

import { authenticated } from '../middlewares/auth-handler'
import { upload } from '../middlewares/multer-upload'

class UserRoute extends Route {
  private readonly userController = new UserController()

  constructor () {
    super()
    this.setRoutes()
  }

  protected setRoutes (): void {
    this.router.get('/home',
      this.userController.homepage.bind(this.userController)
    )
    this.router.post('/signup',
      this.userController.signUp.bind(this.userController)
    )
    this.router.post('/signin',
      this.userController.signIn.bind(this.userController)
    )
    this.router.get('/student/:id/edit', authenticated,
      this.userController.editStudent.bind(this.userController)
    )
    this.router.put('/student/:id', authenticated, upload.single('avatar') as RequestHandler,
      this.userController.putStudent.bind(this.userController)
    )
    this.router.get('/student/:id', authenticated,
      this.userController.getStudent.bind(this.userController)
    )
  }
}

export default UserRoute
