import config from './config'
import app from './app'

const { version, server } = config
const { listenAddress, port } = server

app.listen(port, listenAddress, () => {
// eslint-disable-next-line no-console
  console.log(`App version ${version} listening on address ${listenAddress}, port ${port}`, JSON.stringify(config, null, 2))
})
