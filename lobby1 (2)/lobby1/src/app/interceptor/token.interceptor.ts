import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
// import { AuthService } from '../service/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cokiesService =inject(AuthService)
  const myToken = cokiesService.getToken();
  if(req.url.includes('login')){
    return next(req);
  }
  const token = `Bearer ${myToken}`;
  const cloneReq =req.clone({
    setHeaders :{
      Authorization: token
    }
  })
  return next(cloneReq);
};
