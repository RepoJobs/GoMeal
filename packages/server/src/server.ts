import 'module-alias/register'

import './module-alias.config'
import { ExpressApp } from '@/modules/core/infra/express/app'

new ExpressApp().listen()