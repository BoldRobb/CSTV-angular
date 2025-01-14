import { Routes } from '@angular/router';
import { NoticiaIndividualComponent } from './components/noticias/noticia-individual/noticia-individual.component';
import { LayoutNoticiaComponent } from './components/noticias/layout-noticia/layout-noticia.component';
import { ForumsComponent } from './components/foros/forums/forums.component';
import { ForumTopicsComponent } from './components/foros/forum-topics/forum-topics.component';
import { RankingComponent } from './components/ranking/ranking/ranking.component';
import { EventsMainComponent } from './components/eventos/events-main/events-main.component';
import { PanelComponent } from './Admin/panel/panel.component';
import { EquipoFormComponent } from './Admin/equipo-form/equipo-form.component';
import { RankingFormComponent } from './Admin/ranking-form/ranking-form.component';
import { NoticiaFormComponent } from './Admin/noticia-form/noticia-form.component';
import { UsuarioFormComponent } from './Admin/usuario-form/usuario-form.component';
import { JugadorFormComponent } from './Admin/jugador-form/jugador-form.component';
import { TorneoEquiposModel } from './models/torneo-equipos-model';
import { TorneoFormComponent } from './Admin/torneo-form/torneo-form.component';
import { LoginFormComponent } from './log/login-form/login-form.component';
import { SignupFormComponent } from './log/signup-form/signup-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { TestComponent } from './test/test/test.component';
import { TopicoIndividualComponent } from './components/foros/topico-individual/topico-individual.component';
import { TeamLayoutComponent } from './components/team/team-layout/team-layout.component';
import { EventInidividualComponent } from './components/eventos/event-inidividual/event-inidividual.component';
import { MatchIndividualComponent } from './components/matches/match-individual/match-individual.component';
import { PlayerLayoutComponent } from './components/players/player-layout/player-layout.component';
import { ScoreboardComponent } from './components/live/scoreboard/scoreboard.component';


export const routes: Routes = [
    //Noticias
    {path: 'news', redirectTo:'',},
    {path: 'news/:id', component: NoticiaIndividualComponent },
    //Ranking
    {path: 'ranking', component: RankingComponent},

    //Foro
    {path: 'forum', component: ForumsComponent},
    {path: 'forum/:id', component: ForumTopicsComponent},
    {path: 'topic/:idTopic', component: TopicoIndividualComponent},
    //Admin
    {path: 'admin', component: PanelComponent, children: [
        {path: 'teamsForm', component: EquipoFormComponent},
        {path: 'topicsForm', component: PanelComponent},
        {path: 'rankingForm', component: RankingFormComponent},
        {path: 'eventsForm', component: TorneoFormComponent},
        {path: 'newsForm', component: NoticiaFormComponent},
        {path: 'usersForm', component: UsuarioFormComponent},
        {path: 'playersForm', component: JugadorFormComponent},
        {path: 'Topic', component: PanelComponent},

    ]},
    //Eventos
    {path: 'events', component: EventsMainComponent},
    {path: 'events/:id', component: EventInidividualComponent},



    //live
    {path: 'live', component: ScoreboardComponent},
    //Match
    {path: 'match/:id', component: MatchIndividualComponent},
    //Cuenta
    {path: 'register', component: SignupFormComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'editProfile', component: EditProfileComponent},

    //Players
    {path: 'player/:id', component: PlayerLayoutComponent},
    //Teams
    {path: 'team/:id', component: TeamLayoutComponent},
    //test
    {path: 'test', component: TestComponent},
    //Home
    {path: '', component: LayoutNoticiaComponent},
    {path: '**', redirectTo: '' },
    //test
    
    
];
