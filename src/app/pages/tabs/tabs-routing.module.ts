import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'weights',
        pathMatch: 'full',
      },
      {
        path: 'weights',
        loadChildren: () =>
          import('./weights/weights.module').then((m) => m.WeightsPageModule),
      },
    ],
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'finance',
        pathMatch: 'full',
      },
      {
        path: 'finance',
        loadChildren: () =>
          import('./finance/finance.module').then((m) => m.FinancePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
