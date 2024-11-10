import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterOutlet],
    selector: 'demo',
    template: `<router-outlet></router-outlet>`
})

export default class DemoComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}