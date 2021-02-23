import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictionaryPageComponent } from './routes/dictionary-page/dictionary-page.component';

const routes: Routes = [
    {
        path: '',
        component: DictionaryPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
