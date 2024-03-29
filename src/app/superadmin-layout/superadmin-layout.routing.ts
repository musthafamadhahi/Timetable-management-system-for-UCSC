
import { Routes } from '@angular/router';
import { WorkloadComponent } from 'app/workload/workload.component';
import { StudentCountComponent } from 'app/student-count/student-count.component';
import { LecturerDashboardComponent } from 'app/lecturer-dashboard/lecturer-dashboard.component';
import { MessagesComponent } from 'app/messages/messages.component';
import { SuperadminDashComponent } from 'app/superadmin-dash/superadmin-dash.component';
import { NoticesComponent } from 'app/notices/notices.component';

export const SuperAdminLayoutRoutes: Routes = [
    
     { path: 'superadmin',      component:SuperadminDashComponent },
     { path: 'notice',      component:NoticesComponent },
   
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'student-count',     component: StudentCountComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'subjects',       component: SubjectsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    // { path: 'managelectures',  component: LecturersComponent },
    // { path: 'workload',  component: WorkloadComponent },
];
