import 'module-alias/register'

import './module-alias.config'
import { ExpressApp } from '@/infra/http/express/app'

const app = new ExpressApp()
app.listen()

export { app }