import { Component, OnInit } from '@angular/core';
// import { ShareButton, ShareProvider } from 'ng2-sharebuttons';

@Component({
    moduleId: module.id,
    selector: 'main-app',
    templateUrl: '../views/main.component.html',
    styleUrls: ['../styles/style.scss', '../../custom_theme.scss']
})
export class MainComponent implements OnInit {
    private shareTitle:string = "Share this website";
    private fbInner: string = "https://www.facebook.com";
    private twitterInner: string = "https://www.twitter.com";   
    private linkedInner: string = "https://wwww.linkedin.com";
    private googleInner: string= "https://wwww.google.com";

    constructor() { }

    ngOnInit() { 
        

    }
}