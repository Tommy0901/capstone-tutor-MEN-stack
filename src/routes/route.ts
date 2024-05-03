import { Router } from 'express'

abstract class Route {
  protected router = Router()
  protected abstract setRoutes (): void

  public getRouter (): Router {
    return this.router
  }
}

export default Route
