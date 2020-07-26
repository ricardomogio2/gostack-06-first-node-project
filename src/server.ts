import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import cors from 'cors'

import routes from './routes/index'
import uploadConfig from './config/upload'

import AppError from './errors/AppError'

import './database/index'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server Error!'
  })
})


app.listen(3333, ()=>{
  console.log('💽️ Backend rodando na porta 3333...')
})
