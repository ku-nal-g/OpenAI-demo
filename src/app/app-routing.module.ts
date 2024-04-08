import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentViewComponent } from './components/document-view/document-view.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

const routes: Routes = [
  {
    path: "documents",
    component: DocumentViewComponent
  },
  {
    path: '',
    redirectTo: 'documents',
    pathMatch: 'full'
  },
  {
    path: 'q&A',
    component: ChatbotComponent
  },
  {
    path: '**',
    component: DocumentViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
