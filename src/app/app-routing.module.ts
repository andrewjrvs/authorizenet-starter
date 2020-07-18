import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CCComponent } from './forms/cc.component';
import { SuccessComponent } from './forms/success.component';
import { FormsComponent } from './forms/forms.component';



const routes: Routes = [

    {
        path: 'payment',
        component: FormsComponent,
        children: [
            {
                path: 'cc',
                component: CCComponent,
            },
            {
                path: 'success',
                component: SuccessComponent,
            },
            { path: '', redirectTo: 'cc', pathMatch: 'full' },
        ]
    },
    { path: '', redirectTo: '/payment', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
