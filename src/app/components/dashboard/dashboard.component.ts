import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chart1 = {
    forceFit: true,
    height: 46,
    width: 200,
    padding: [0, 6],
    scale: [{
      dataKey: 'value',
    }, {
      dataKey: 'date',
    }]
  }
  userData = [
    { date: '2019-03-5', value: 2 },
    { date: '2019-03-6', value: 1 },
    { date: '2019-03-7', value: 4 },
    { date: '2019-03-8', value: 9 },
    { date: '2019-03-9', value: 3 },
    { date: '2019-03-10', value: 2 },
    { date: '2019-03-11', value: 6 },
    { date: '2019-03-12', value: 1 },
    { date: '2019-03-13', value: 5 },
    { date: '2019-03-14', value: 2 },
    { date: '2019-03-15', value: 7 },
    { date: '2019-03-16', value: 6 },
    { date: '2019-03-17', value: 1 },
    { date: '2019-03-18', value: 9 }
  ];
  pageData = [
    { date: '2019-03-5', value: 2 },
    { date: '2019-03-6', value: 1 },
    { date: '2019-03-7', value: 4 },
    { date: '2019-03-8', value: 9 },
    { date: '2019-03-9', value: 3 },
    { date: '2019-03-10', value: 2 },
    { date: '2019-03-11', value: 6 },
    { date: '2019-03-12', value: 1 },
    { date: '2019-03-13', value: 5 },
    { date: '2019-03-14', value: 2 },
    { date: '2019-03-15', value: 7 },
    { date: '2019-03-16', value: 6 },
    { date: '2019-03-17', value: 1 },
    { date: '2019-03-18', value: 9 }
  ];

  constructor() { }

  ngOnInit() {
  }

}
