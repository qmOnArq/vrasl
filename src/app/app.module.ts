import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvatarRendererComponent } from './components/avatar-renderer/avatar-renderer.component';
import { HomePageComponent } from './routes/home-page/home-page.component';

@NgModule({
    declarations: [AppComponent, AvatarRendererComponent, HomePageComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
