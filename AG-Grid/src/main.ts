import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { AppComponent } from './app/app.component';
// import { authInterceptor } from './app/interceptors/auth.interceptor';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(withInterceptors([authInterceptor]))
//   ]
// }).catch(err => console.error(err));
