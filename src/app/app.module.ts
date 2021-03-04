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
import { CollapsableComponent } from './components/collapsable/collapsable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { EmptyPageComponent } from './routes/empty-page/empty-page.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SpellingQuizPageComponent } from './routes/spelling-quiz-page/spelling-quiz-page.component';
import { SettingsPageComponent } from './routes/settings-page/settings-page.component';
import { WordQuizPageComponent } from './routes/word-quiz-page/word-quiz-page.component';
import { AlwaysFocusDirective } from './directives/always-focus.directive';

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
        CollapsableComponent,
        InputSearchComponent,
        EmptyPageComponent,
        SpellingQuizPageComponent,
        SettingsPageComponent,
        WordQuizPageComponent,
        AlwaysFocusDirective,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        SnotifyModule,
        BrowserAnimationsModule,
        ScrollingModule,
    ],
    providers: [WordNamePipe, { provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService],
    bootstrap: [AppComponent],
})
export class AppModule {}
