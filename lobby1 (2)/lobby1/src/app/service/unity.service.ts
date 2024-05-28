import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnityService {
  setupUnity(): void {
    // Initialize Unity WebGL here
    console.log('Unity setup initiated');
  }

  cleanupUnity(): void {
    // Cleanup Unity WebGL here
    console.log('Unity cleanup initiated');
  }
}