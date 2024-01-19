import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},   
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
    ) ],
};
