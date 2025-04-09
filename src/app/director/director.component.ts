import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import * as platform from 'platform';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-director',
  imports: [HttpClientModule],
  templateUrl: './director.component.html',
  styleUrl: './director.component.scss',
})
export class DirectorComponent implements OnInit {
  private http = inject(HttpClient);

  userId = '';
  ip = '';
  city = '';
  state = '';
  country = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.http
      .get<any>('https://ipinfo.io?token=dff04074741dfc')
      .subscribe((response) => {
        // Capture route parameter 'dynamic'
        this.route.paramMap.subscribe((params) => {
          let hashId = params.get('dynamic');
          console.log('Dynamic Route Param (hashId):', hashId);

          // Handle query parameters
          this.route.queryParams.subscribe((p) => {
            // Safely access userId and handle undefined cases
            this.userId = p['cId'] || ''; // Fallback to empty string if uId is undefined
            console.log('User ID:', this.userId);

            const obj = {
              userId: this.userId,
              browser: platform.name,
              browserVersion: platform.version,
              os: platform.os?.family,
              ipAddress: response.ip,
              city: response.city,
              state: response.region,
              country: response.country,
            };
            console.log('User Info:', obj);

            if (hashId) {
              this.http
                .post<any>(
                  `https://qrcode-production-b639.up.railway.app/api/qrcode/scan/${hashId}`,
                  obj
                )
                .subscribe((response) => {
                  console.log('Response:', response);
                });
            }
          });
        });
      });
  }

  getUserIp() {
    this.http
      .get<any>('https://ipinfo.io?token=dff04074741dfc')
      .subscribe((response) => {
        console.log('IP Info:', response);
        this.ip = response.ip;
        this.city = response.city;
        this.state = response.region;
        this.country = response.country;
      });
  }
}
