import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { About, Contact, Hardware, Home, Review, Service, SocialNetwork, Software } from '../../models/sites.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private baseUrl = environment.baseUrl;
  homeData = signal<Home | null>(null);
  contactData = signal<Contact | null>(null);
  aboutData = signal<About | null>(null);
  serviceDataList = signal<Service[]>([]);
  serviceDataDetail = signal<Service | null>(null);
  socialNetworkData = signal<SocialNetwork[]>([]);
  reviewData = signal<Review[]>([]);
  hardwareDataList = signal<Hardware[]>([]);
  hardwareDataDetail = signal<Hardware | null>(null);
  softwareDataList = signal<Software[]>([]);
  softwareDataDetail = signal<Software | null>(null);
  errorMessage = signal<string | null>(null);
  errorStatus = signal<boolean>(false);

  private fixtureFileUrl<T>(data:T):T{
    if (!data) return data;
    if(Array.isArray(data)){
      return data.map(item=>this.fixtureFileUrl(item)) as any;
    }
    const fileField = ["image"]; //On ajoute juste si besoin
    const obj = { ...(data as any)};
    fileField.forEach(field=>{
      if(obj[field] && typeof obj[field] === "string" && !obj[field].startsWith("http")){
        obj[field] = this.baseUrl + obj[field];
      }
    })
    return obj as T;
  }
  private fetchAndSetData<T>(url: string, target:WritableSignal<T | null>, initialValue: T | null, params?: Record<string, string>){
    this.errorStatus.set(false);
    this.errorMessage.set(null);
    target.set(initialValue);
    this.http.get<T>(`${this.apiUrl}/${url}/`, {params}).subscribe({
      next:(data)=>{
        this.errorStatus.set(false);
        const cleanData = this.fixtureFileUrl(data);
        target.set(cleanData);
  },
      error:(err)=>{
        this.errorStatus.set(true);
        let message = 'Une erreur est survenue. Veuillez réessayer.';
        if (err?.error && typeof err.error.message === "string"){
          message = err.error.message;
        }
        this.errorMessage.set(message);
        
      }
});
  }
  loadHomeData(): void{
    this.fetchAndSetData<Home>("home", this.homeData, null);
  }
  loadContactData():void{
    this.fetchAndSetData<Contact>("contact", this.contactData, null);
  }
  loadAboutData():void{
    this.fetchAndSetData<About>("about", this.aboutData, null);
  }
  loadServiceDataList(): void{
    this.fetchAndSetData<Service[]>("services", this.serviceDataList, []);
  }
  loadServiceDataDetail(id: string): void{
    this.fetchAndSetData<Service>(`services/${id}`, this.serviceDataDetail, null);
  }
  loadSocialNetworkData():void{
    this.fetchAndSetData<SocialNetwork[]>("social-network", this.socialNetworkData, []);
  }
  loadReviewData():void{
    this.fetchAndSetData<Review[]>("reviews", this.reviewData, []);
  }
  loadHardwareDataList(): void{
    this.fetchAndSetData<Hardware[]>("hardwares", this.hardwareDataList, []);
  }
  loadHardwareDataDetail(id: string): void{
    this.fetchAndSetData<Hardware>(`hardwares/${id}`, this.hardwareDataDetail, null);
  }
  loadSoftwareDataList():void {
    this.fetchAndSetData<Software[]>("softwares", this.softwareDataList,[]);
  }
  loadSoftwareDataDetail(id: string):void {
    this.fetchAndSetData<Software>(`softwares/${id}`, this.softwareDataDetail, null);
  }
  createReview(content: string, rating: number){
    return this.http.post(`${this.apiUrl}/reviews/`, {content, rating});
  }
  deleteReview(id:number){
    return this.http.delete(`${this.apiUrl}/reviews/${id}`);
  }
  updateReview(id: number, content: string, rating: number){
    return this.http.patch(`${this.apiUrl}/reviews/${id}/update/`,{content, rating});
  }
}
