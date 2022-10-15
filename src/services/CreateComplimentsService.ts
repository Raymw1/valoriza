import { getCustomRepository } from 'typeorm';
import { ComplimentsRepository } from '../repositories/ComplimentsRepository';
import { UsersRepository } from '../repositories/UsersRepository';

interface IComplimentRequest {
  message: string;
  tag_id: string;
  user_sender: string;
  user_receiver: string;
}

class CreateComplimentsService {
  async execute({
    message,
    tag_id,
    user_sender,
    user_receiver,
  }: IComplimentRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const usersRepository = getCustomRepository(UsersRepository);
    if (user_sender === user_receiver)
      throw new Error('Incorrect user receiver!');

    const userReceiverExists = await usersRepository.findOne(user_receiver);
    if (!userReceiverExists) throw new Error('User receiver not found!');

    const compliment = complimentsRepository.create({
      message,
      tag_id,
      user_sender,
      user_receiver,
    });
    await complimentsRepository.save(compliment);
    return compliment;
  }
}

export { CreateComplimentsService };
