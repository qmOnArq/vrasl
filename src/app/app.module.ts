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
import { CurrentWordLabelComponent } from './components/current-word-label/current-word-label.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    declarations: [
        AppComponent,
        DictionaryPageComponent,
        WordNamePipe,
        PlayerControlsComponent,
        NavigationComponent,
        AslWordButtonComponent,
        CurrentWordLabelComponent,
        LoaderComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, SnotifyModule],
    providers: [WordNamePipe, { provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService],
    bootstrap: [AppComponent],
})
export class AppModule {}
