// sse.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SSEService {

  constructor(private http: HttpClient) { }

  // Method to establish SSE connection and return an Observable
  getEventStream(): Observable<any> {
    const eventSource = new EventSource('http://43.205.15.109:3003/api/v1/sse/helix');
    const subject = new Subject<any>();

    eventSource.onmessage = (event) => {
      subject.next(event.data); // Emit received data
    };

    eventSource.onerror = (error) => {
      subject.error(error); // Emit errors
      eventSource.close();
    };

    return subject.asObservable(); // Return Observable
  }
}
