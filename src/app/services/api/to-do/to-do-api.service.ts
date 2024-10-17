import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IToDoElement} from "../../../interfaces/to-do-page/to-do-element.interface";

@Injectable({
  providedIn: 'root'
})
export class ToDoApiService {
  private readonly url = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  public get(id?: string | number): Observable<Object> {
    const url = id ? `${this.url}/${id}` : this.url;
    return this.http.get(url)
  }

  public post(payload: IToDoElement): Observable<Object> {
    return this.http.post(this.url, payload)
  }

  public patch(payload: IToDoElement, id: string | number): Observable<Object> {
    return this.http.patch(`${this.url}/${id}`, payload)
  }

  public delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}/${id}`)
  }
}
