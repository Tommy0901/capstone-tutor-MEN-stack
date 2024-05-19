import CourseController from '../controllers/course-controller'
import Route from './route'

import { authenticated } from '../middlewares/auth-handler'
import { upload } from '../middlewares/multer-upload'

class CourseRoute extends Route {
  private readonly courseController = new CourseController()

  constructor () {
    super()
    this.setRoutes()
  }

  protected setRoutes (): void {
    this.router.put('/course/:courseId', authenticated, upload.single('image'),
      this.courseController.putCourse.bind(this.courseController)
    )
    this.router.get('/course/:courseId', authenticated,
      this.courseController.getCourse.bind(this.courseController)
    )
    this.router.post('/course', authenticated, upload.single('image'),
      this.courseController.postCourse.bind(this.courseController)
    )
  }
}

export default CourseRoute
