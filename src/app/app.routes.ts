import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BaseComponent } from './features/base/base.component';

export const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        children: [
            {
                path: '', loadComponent: () => import('./features/index/index.component')
            },
            {
                path: 'data-feeds', loadComponent: () => import('./features/data-feed/data-feed.component')
            },
            {
                path: 'snapshots', loadComponent: () => import('./features/snapshots/snapshots.component')
            },
            {
                path: 'smtp', loadComponent: () => import('./features/smtp/smtp.component')
            },
            {
                path: 'demo',
                loadComponent: () => import('./features/demo/demo.component'),
                canMatch: [],
                children: [
                    {path: '', redirectTo: '/demo/data-feeds', pathMatch: 'full'},
                    {path: 'data-feeds', loadComponent: () => import('./features/demo/data-feeds/data-feeds-demo.component')},
                    {path: 'smtp', loadComponent: () => import('./features/demo/smtp/smtp-demo.component')},
                    {path: 'snapshots', loadComponent: () => import('./features/demo/snapshots/snapshots-demo.component')}
                ]
            }
        ]
    }
];
