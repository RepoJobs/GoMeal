import moduleAlias from 'module-alias'
moduleAlias.addAliases({ '@': __dirname })
moduleAlias.addAliases({ '@tests': __dirname + '../tests/' })