import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptor/token.interceptor';
import { errorIntercepter } from './interceptor/error.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
providers: [provideRouter(routes),provideToastr(),provideAnimations(),provideHttpClient(withInterceptors([tokenInterceptor,errorIntercepter]))]
};
