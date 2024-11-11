import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'smtp-demo',
    template: `
    <div class="loading-cover">
        <span>under development...</span>
    </div>
    `
})

export default class SMTPDemoComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}