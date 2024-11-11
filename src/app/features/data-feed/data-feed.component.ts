import { Component, inject, OnInit } from '@angular/core';
import { IcService } from '../../ic.service';
import { AuthService } from '../../services/auth.service';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule],
    selector: 'data-feed',
    templateUrl: 'data-feed.component.html',
    styleUrl: 'data-feed.component.css'
})

export default class DataComponent implements OnInit {
    private icService = inject(IcService);
    private authService = inject(AuthService);

    actor = this.icService.createActor({});
    data: any[] = [];

    constructor(){
        
    }

    ngOnInit(): void {
        from(this.actor).subscribe({
        next: actor => {
            actor.get("coins").then(data => {
                data = JSON.parse(data);

                if (data.hasOwnProperty("result")) {
                    this.data = Object(data)['result'];
                }
                
            })
        }
        });
    }

    public async login() {
        await this.authService.login();
    }

    isArray(data: any) {
        return Array.isArray(data);
    }
}