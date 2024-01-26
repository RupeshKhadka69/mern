import { NextFunction,Request,Response } from "express";

const notFound = (req:Request,res:Response,next:NextFunction):void=> {
    const error = new Error(`Page NotFound- ${req.originalUrl}`)
    res.status(404);
    next(error);
}

const errorHandler = (err:Error,req:Request,res:Response,next:NextFunction):void => {
    let statusCode:number  = req.statusCode === 200 ? 500 : req.statusCode || 500;
    let message = err.message;
    if (err.name === 'CastError' && (err as any).id === 'objectId') {
        statusCode = 404;
        message = 'Resource not Found';
      }

      res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV == 'production'? null : err.stack,
      })

}
export {errorHandler,notFound}