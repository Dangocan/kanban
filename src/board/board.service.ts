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

  async getAll(userId: string) {
    const boardsParticipating = await BoardModel.find({
      $or: [{ createdBy: userId }, { usersAllowed: userId }],
    });

    return boardsParticipating;
  },

  async getBoardDetails(id: string) {
    const boardDeatil = await BoardModel.findById(id);

    return boardDeatil;
  },

  async updateBoard(
    id: string,
    title: string,
    usersAllowed: string[],
    createdBy: string
  ) {
    const updatedBoard = await BoardModel.findByIdAndUpdate(
      id,
      {
        title,
        usersAllowed,
        createdBy,
      },
      { new: true }
    );
    return updatedBoard;
  },

  async deleteBoard(id: string) {
    return await BoardModel.findOneAndDelete({ _id: id });
  },
};

export { BoardService };
