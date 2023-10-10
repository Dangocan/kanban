import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const checkJwtToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }
  try {
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string);
    res.locals.jwtPayload = jwtPayload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { checkJwtToken };
