import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictionaryPageComponent } from './routes/dictionary-page/dictionary-page.component';

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
        component: DictionaryPageComponent,
    },
    {
        path: 'word-quiz',
        component: DictionaryPageComponent,
    },
    {
        path: 'settings',
        component: DictionaryPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
