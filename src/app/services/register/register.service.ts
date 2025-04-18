import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegisterDataService {
    private dataPlayersTeam: BehaviorSubject<any[]>;
    data$: Observable<any[]>;
    constructor() {
        const savedData = sessionStorage.getItem('players');
        const initialData = savedData ? JSON.parse(savedData) : [];
        this.dataPlayersTeam = new BehaviorSubject<any[]>(initialData);
        this.data$ = this.dataPlayersTeam.asObservable();
    }

    saveDataPlayer(data: any) {
        const currentData = this.dataPlayersTeam.value;
        const newData = [...currentData, data];
        this.dataPlayersTeam.next(newData);
        sessionStorage.setItem('players', JSON.stringify(newData));
    }

    getDataPlayer(): any[] {
        return this.dataPlayersTeam.value;
    }

    deletePlayer(index: number) {
        const currentData = this.dataPlayersTeam.value;
        currentData.splice(index, 1);
        this.dataPlayersTeam.next([...currentData]); 
        sessionStorage.setItem('players', JSON.stringify(currentData)); 
    } 

    registrationsCancel() {
        this.dataPlayersTeam.next([]);
        sessionStorage.removeItem('players');
    }
}