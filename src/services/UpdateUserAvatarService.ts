import { getRepository } from "typeorm"
import path from 'path'
import fs from 'fs'

import User from "../models/User"
import uploadConfig from '../config/upload'
import AppError from '../errors/AppError'

interface Request{
  user_id: string,
  avatarFilename: string
}

class UpdateUserAvatarService{
  public async execute({user_id, avatarFilename}: Request): Promise<User>{
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(user_id)
    const users = await usersRepository.find({
      where:{
        name:'ricardo'
      }
    })

    if(!user){
      throw new AppError('Only authenticated users can change avatar')
    }
    if(user.avatar){
      //deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await usersRepository.save(user)

    return user

  }
}

export default UpdateUserAvatarService
