import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DictionaryPageComponent } from './routes/dictionary-page/dictionary-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WordNamePipe } from './pipes/word-name.pipe';
import { PlayerControlsComponent } from './components/player-controls/player-controls.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AslWordButtonComponent } from './components/asl-word-button/asl-word-button.component';

@NgModule({
    declarations: [AppComponent, DictionaryPageComponent, WordNamePipe, PlayerControlsComponent, NavigationComponent, AslWordButtonComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
    providers: [WordNamePipe],
    bootstrap: [AppComponent],
})
export class AppModule {}
