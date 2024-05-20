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
    this.router.put('/student/:id', authenticated, upload.single('avatar'),
      this.userController.putStudent.bind(this.userController)
    )
    this.router.get('/student/:id', authenticated,
      this.userController.getStudent.bind(this.userController)
    )
    this.router.get('/teacher/:id/personal', authenticated,
      this.userController.getTeacher.bind(this.userController)
    )
    this.router.get('/teacher/:id/edit', authenticated,
      this.userController.editTeacher.bind(this.userController)
    )
    this.router.put('/teacher/:id', authenticated, upload.single('avatar'),
      this.userController.putTeacher.bind(this.userController)
    )
    this.router.patch('/teacher/:id', authenticated,
      this.userController.patchTeacher.bind(this.userController)
    )
    this.router.get('/teacher/:id',
      this.userController.getTeacher.bind(this.userController)
    )
  }
}

export default UserRoute
