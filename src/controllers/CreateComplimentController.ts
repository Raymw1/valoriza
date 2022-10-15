import { Request, Response } from 'express';
import { CreateComplimentsService } from '../services/CreateComplimentsService';

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { message, tag_id, user_sender, user_receiver } = request.body;
    const createComplimentsService = new CreateComplimentsService();
    const compliment = await createComplimentsService.execute({
      message,
      tag_id,
      user_sender,
      user_receiver,
    });
    return response.status(201).json(compliment);
  }
}

export { CreateComplimentController };
