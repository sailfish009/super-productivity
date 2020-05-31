import {Injectable} from '@angular/core';
import {ProjectService} from '../project/project.service';
import {Actions, ofType} from '@ngrx/effects';
import {setActiveWorkContext} from '../work-context/store/work-context.actions';
import {ProjectActionTypes} from '../project/store/project.actions';
import {concatMap, filter, first, switchMap} from 'rxjs/operators';
import {WorkContextService} from '../work-context/work-context.service';
import {Observable} from 'rxjs';
import {SyncService} from '../../imex/sync/sync.service';

@Injectable({
  providedIn: 'root',
})
export class IssueEffectHelperService {
  pollIssueTaskUpdatesActions$ = this._actions$.pipe(
    ofType(
      setActiveWorkContext,
      ProjectActionTypes.UpdateProjectIssueProviderCfg,
    )
  );
  pollToBacklogActions$ = this._actions$.pipe(
    ofType(
      setActiveWorkContext,
      ProjectActionTypes.UpdateProjectIssueProviderCfg,
    )
  );
  pollToBacklogTriggerToProjectId$: Observable<string> = this._syncService.afterInitialSyncDoneAndDataLoadedInitially$.pipe(
    concatMap(() => this.pollToBacklogActions$),
    switchMap(() => this._workContextService.isActiveWorkContextProject$.pipe(first())),
    // NOTE: it's important that the filter is on top level otherwise the subscription is not canceled
    filter(isProject => isProject),
    switchMap(() => this._workContextService.activeWorkContextId$.pipe(first()))
  );

  constructor(
    private  _actions$: Actions,
    private _projectService: ProjectService,
    private _workContextService: WorkContextService,
    private _syncService: SyncService,
  ) {
  }
}

