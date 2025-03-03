const koa = require('koa'); // 导入koa模块
const { sign } = require('jsonwebtoken'); // 签发token
const bodyParser = require('koa-bodyparser'); // 导入body-parser中间件
const jwt = require('koa-jwt')({ secret }) // jwt加密中间件
const { secret } = require('./config') // 秘钥

const app = new koa();