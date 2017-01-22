import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'about-tab',
    templateUrl: '../views/about.component.html',
    styleUrls: ['../styles/style.scss', '../../custom_theme.scss']
})

export class AboutComponent implements OnInit{
    private about_us: string[];
    private contacts: string[];
    private timings: string[];
    private others: string[];
    constructor(){
        this.about_us = [
            "Good Food",
            "Healthy",
            "Something Cool"
        ];
        this.contacts = [
            "9971119905",
            "8894730166"
        ];
        this.timings = [
            "Lunch: 12:00 - 14:00",
            "Dinner: 18:00 - 20:00"
        ];
        this.others = [
            "We take order for parties, wedding, functions etc",
            "You name it, we will be there"
        ]
    }

    ngOnInit(): void{

    }
}