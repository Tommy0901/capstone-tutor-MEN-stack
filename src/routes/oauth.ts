import Route from './route'

import { oauth, oauthCallback } from '../middlewares/auth-handler'

class OauthRoute extends Route {
  constructor () {
    super()
    this.setRoutes()
  }

  protected setRoutes (): void {
    this.router.get('/oauth/facebook', oauth('facebook'))
    this.router.get('/oauth/facebook/callback', oauthCallback('facebook'))
    this.router.get('/oauth/google', oauth('google'))
    this.router.get('/oauth/google/callback', oauthCallback('google'))
  }
}

export default OauthRoute
