import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictionaryPageComponent } from './routes/dictionary-page/dictionary-page.component';
import { SpellingQuizPageComponent } from './routes/spelling-quiz-page/spelling-quiz-page.component';
import { SettingsPageComponent } from './routes/settings-page/settings-page.component';
import { WordQuizPageComponent } from './routes/word-quiz-page/word-quiz-page.component';
import { EmptyPageComponent } from './routes/empty-page/empty-page.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dictionary',
    },
    {
        path: 'dictionary/word/:word',
        component: DictionaryPageComponent,
    },
    {
        path: 'dictionary',
        component: DictionaryPageComponent,
    },
    {
        path: 'spelling-quiz',
        component: SpellingQuizPageComponent,
    },
    {
        path: 'word-quiz',
        component: WordQuizPageComponent,
    },
    {
        path: 'settings',
        component: SettingsPageComponent,
    },
    {
        path: '**',
        component: EmptyPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
