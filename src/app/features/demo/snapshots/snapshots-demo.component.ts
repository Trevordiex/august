import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'snapshots-demo',
    template: `
        <div class="loading-cover">
            <span>under development...</span>
        </div>
    `
})

export default class SnapshotsDemoComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}