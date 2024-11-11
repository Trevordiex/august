
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IcService } from '../../../ic.service';
import { from } from 'rxjs';
import { environment } from "../../../../environments/environment";
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    selector: 'data-feeds-demo',
    templateUrl: 'data-feeds-demo.component.html',
    styleUrl: 'data-feeds-demo.component.css'
})

export default class DatafeedsDemoComponent implements OnInit {
    
    private fb = inject(FormBuilder);
    private icService = inject(IcService);
    private canisterId = environment.BACKEND_CANISTER_ID;

    disabled = false;

    actor = this.icService.createActor({});
    
    data: any[] = [];

    form = this.fb.group({
        canister: [this.canisterId, [Validators.required]],
        endpoint: ['', [Validators.required]],
        argument: ['']
    })

    constructor(){
        
    }

    ngOnInit(): void {
        this.form.patchValue({endpoint: 'coins'});
    }

    fetch() {
        if (this.form.valid) {
            let endpoint = this.form.value.endpoint!;
            this.actor.then(actor => {
                this.disabled = true;
                actor.get(endpoint)
                .then(data => {
                    this.data = JSON.parse(data);
                    this.disabled = false;
                })
                
            });            
        }
        else {
            console.log(this.form.errors);
        }
    }

    isArray(data: any) {
        return Array.isArray(data);
    }
}