
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'base-component',
    templateUrl: 'base.component.html',
    styleUrl: 'base.component.css'
})

export class BaseComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}