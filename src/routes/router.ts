import type Route from './route'
import UserRoute from './user'
import CourseRoute from './course'

export const router: Route[] = [
  new UserRoute(),
  new CourseRoute()
]
