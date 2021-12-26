const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.note.createMany({
    data: [
      {
        title: 'Deploy a Go Gin Application on Koyeb',
        content:
          'This tutorial explains how to deploy a Go Gin application on the Koyeb serverless platform using git-driven deployment.',
      },
      {
        title:
          'Deploy a Laravel Application with Continuous Deployment on Koyeb',
        content:
          'This guide shows how to deploy a Laravel application on the Koyeb Serverless Platform using git-driven deployment. Git-driven deployment allows you to push your code without having to take care of the build, deployment, and run process. Koyeb handles all this for you.',
      },
      {
        title: 'Continuous Deployment of a NestJS Application on Koyeb',
        content:
          'This guide explains how to continuously deploy a NestJS application on the Koyeb serverless platform.',
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
