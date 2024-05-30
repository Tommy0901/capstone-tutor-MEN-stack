import type Route from './route'
import UserRoute from './user'
import CourseRoute from './course'
import RegisterRoute from './register'
import AdminRoute from './admin'
import OauthRoute from './oauth'

export const router: Route[] = [
  new UserRoute(),
  new CourseRoute(),
  new RegisterRoute(),
  new AdminRoute(),
  new OauthRoute()
]
