import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'demo',
    templateUrl: 'demo.component.html',
    styleUrl: 'demo.component.css'
})

export default class DemoComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}