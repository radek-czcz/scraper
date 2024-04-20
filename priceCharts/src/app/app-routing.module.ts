import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvComponent } from './cv/cv.component';
import { MainComponent } from './main/main.component'

const routes: Routes = [
	{ path: '', component: MainComponent },
	{ path: 'cv', component: CvComponent },
	{path: '**', redirectTo: '/index.html', pathMatch: 'full'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }