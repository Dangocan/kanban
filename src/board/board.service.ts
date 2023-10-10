import { BoardModel } from "./board.entity";

const BoardService = {
  async createBoard(title: string, usersAllowed: string[], createdBy: string) {
    const newBoard = await BoardModel.create({
      title,
      usersAllowed,
      createdBy,
    });
    return newBoard;
  },
};

export { BoardService };
