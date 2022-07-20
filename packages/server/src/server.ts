import 'module-alias/register'

import './module-alias.config'
import { ExpressApp } from '@/infra/http/express/app'

new ExpressApp().listen()