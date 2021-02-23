import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvatarRendererComponent } from './components/avatar-renderer/avatar-renderer.component';
import { DictionaryPageComponent } from './routes/dictionary-page/dictionary-page.component';

@NgModule({
    declarations: [AppComponent, AvatarRendererComponent, DictionaryPageComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
