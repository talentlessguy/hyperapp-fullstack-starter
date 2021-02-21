import { createApp } from '../server.js'

module.exports = async (req, res) => (await createApp()).handler(req, res)
