import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HelixBetPlaceRes} from "../interface/HelixBetPlaceRes";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BetService {


  baseUrl = environment.apiUrl + '/api/v1/helix'

  constructor(private http: HttpClient) {

  }


  getRecentCrash(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + "/crashes")
  }

  // Method to send a POST request to insert a bet
  insertBet(betData: any): Observable<HelixBetPlaceRes> {
    return this.http.post<HelixBetPlaceRes>(this.baseUrl + '/insertBet', betData);
  }

  collectionBet(collectionData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/collectBet', collectionData)
  }

  getMyBets():Observable<any>{
    return this.http.get(this.baseUrl+'/myBets');
  }

  getAllBets(roundId):Observable<any>{
    return this.http.get(this.baseUrl+`/allBets/${roundId}`);
  }

 

}
