import express, { Request, Response, NextFunction } from 'express';

export const toLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.employee_id) {
    return res.redirect('/employee/login');
  }
  next();
};

export const toHome = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.employee_id) {
    return res.redirect('/');
  }
  next();
};

export const apiAuthCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.employee_id) {
    return res.send('You must be authenticated to perform this action.');
  }
  next();
};
