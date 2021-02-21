const PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || 'localhost'

/**
 * Start a tinyhttp app
 * @param {*} app
 */
export const startApp = (app) =>
  app.listen(PORT, () => console.log(`Started a ${process.env.NODE_ENV || 'dev'} server on http://${HOST}:${PORT}`))
