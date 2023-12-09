import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const serverConfig: ApplicationConfig = {
    providers: [provideServerRendering()],
    // imports: [FontAwesomeModule]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
