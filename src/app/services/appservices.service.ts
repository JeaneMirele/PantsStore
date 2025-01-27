import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {
  
  private apiUrl = 'http://localhost:3000/produtos'; 

  constructor(private http: HttpClient) {}

  list():Observable<Produto[]>{
    return this.http.get<Produto[]>(this.apiUrl);
  }

  listPaginated(ordem: string| undefined, tamanho:string| undefined, nPage: number, pagSize: number){
   let httpParams= new HttpParams();
    if(tamanho){
      httpParams = httpParams.set("tamanho", tamanho);
    }
   
   if(ordem){
      httpParams = httpParams.set("_sort", ordem);

    }
    httpParams = httpParams.set("_page", nPage);
    httpParams = httpParams.set("_per_page", pagSize);

    return this.http.get<any>(this.apiUrl, {params:httpParams});
   
  }

  
  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  deleteProduto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateProduto(id: string, produto: Produto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, produto);
  }

  getProdutoById(id: string): Observable<Produto> {
      return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }
}



