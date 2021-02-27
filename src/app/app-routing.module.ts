import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictionaryPageComponent } from './routes/dictionary-page/dictionary-page.component';
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
        component: EmptyPageComponent,
    },
    {
        path: 'word-quiz',
        component: EmptyPageComponent,
    },
    {
        path: 'settings',
        component: EmptyPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
