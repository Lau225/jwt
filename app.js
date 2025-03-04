const koa = require('koa'); // 导入koa模块
const { sign } = require('jsonwebtoken'); // 签发token
const bodyParser = require('koa-bodyparser'); // 导入body-parser中间件
const { secret } = require('./config'); // 秘钥
const Router = require('koa-router');
const admin = require('./middleware/admin'); // 导入admin模块
const jwt = require('koa-jwt')({ secret }) // jwt加密中间件

const app = new koa();

const router = new Router()

router.post('/api/login', async (ctx, next) => {
    const user = ctx.request.body
    if (user && user.username) {
        let { username } = user
        const token = sign({ username }, secret, { expiresIn: '1h' }) // 签发token
        ctx.body = {
            message: 'success',
            token
        }
    } else {
        ctx.body = {
            message: 'error',
            data: 'username is required'
        }
    }


})
    .get('/api/userInfo', jwt, async (ctx, next) => {
        ctx.body = {
            massage: 'success',
            username: ctx.state.user.username
        }
    })
    .get('/api/adminInfo', jwt, admin(), async (ctx, next) => {
        ctx.body = {
            message: "admin",
            username: ctx.state.user.username
        }
    })
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3002, () => {
    console.log('listening on port 3002.....');

})