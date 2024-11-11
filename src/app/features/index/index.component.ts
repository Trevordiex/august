

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterLink],
    selector: 'index-page',
    templateUrl: 'index.component.html',
    styleUrl: 'index.component.css'
})

export default class IndexComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}