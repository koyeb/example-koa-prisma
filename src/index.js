const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-body')
const { PrismaClient } = require('@prisma/client')

const app = new Koa()
const router = new Router()
const prisma = new PrismaClient()

app.use(bodyParser())

router.get('/notes', async (ctx) => {
  const notes = await prisma.note.findMany({
    where: { status: ctx.query.status },
  })

  ctx.response.status = 200
  ctx.body = {
    message: 'Notes retrieved',
    data: notes,
  }
})

router.get('/notes/:id', async (ctx) => {
  const note = await prisma.note.findUnique({
    where: { id: Number(ctx.params.id) },
  })

  if (note) {
    ctx.response.status = 200
    ctx.body = {
      message: 'Note retrieved',
      data: note,
    }
  } else {
    ctx.response.status = 404
    ctx.body = {
      message: 'Note not found',
    }
  }
})

router.post('/notes', async (ctx) => {
  const note = await prisma.note.create({
    data: {
      title: ctx.request.body.title,
      content: ctx.request.body.content,
      status: ctx.request.body.status,
    },
  })

  ctx.response.status = 201
  ctx.body = {
    message: 'Note created',
    data: note,
  }
})

router.put('/notes/:id', async (ctx) => {
  const note = await prisma.note.update({
    where: { id: Number(ctx.params.id) },
    data: {
      title: ctx.request.body.title,
      content: ctx.request.body.content,
      status: ctx.request.body.status,
    },
  })

  ctx.response.status = 200
  ctx.body = {
    message: 'Note updated',
    data: note,
  }
})

router.delete('/notes/:id', async (ctx) => {
  await prisma.note.delete({ where: { id: Number(ctx.params.id) } })

  ctx.response.status = 204
  ctx.body = {
    message: 'Note delete',
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8080, () => {
  console.log('Server running at: http://localhost:8080')
})
