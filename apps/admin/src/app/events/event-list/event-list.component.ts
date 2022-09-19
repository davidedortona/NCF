import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService} from '@ncf/services';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
@Component({
  selector: 'ncf-event-list',
  templateUrl: './event-list.component.html',
  styles: [
  ]
})
export class EventListComponent implements OnInit, OnDestroy {


  events: Event[] = [];
  endsubs$ : Subject<void> = new Subject();

  constructor(
    private eventsService: EventsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    
    this._getEvents();
   // window.location.reload();
  }

  
  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete(); 
  }

  deleteEvent(eventId: string) {
    this.confirmationService.confirm({
      message: 'Vuoi davvero eliminare questo evento?',
      header: 'Elimina Evento',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventsService.deleteEvent(eventId).subscribe(
          () => {
            this._getEvents();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `L'evento è stato eliminato con successo!`
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Non è stato possibile eliminare l'evento!`
            });
          }
        );
      }
    });
  }

  updateEvent(eventid: string ){
    this.router.navigateByUrl(`events/form/${eventid}`)
  }

  private _getEvents(){
    this.eventsService.getAllEvents().pipe(takeUntil(this.endsubs$)).subscribe(events => {
      this.events = events;
    })
  }
}
