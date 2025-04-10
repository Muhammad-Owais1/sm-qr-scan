import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector'; // Import the library

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
  browser = '';
  browserVersion = '';
  os = '';

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit(): void {
    // Get device info using ngx-device-detector
    const deviceInfo = this.deviceService.getDeviceInfo();
    this.browser = deviceInfo.browser;
    this.browserVersion = deviceInfo.browser_version;
    this.os = deviceInfo.os;

    this.http
      .get<any>('https://ipinfo.io?token=dff04074741dfc')
      .subscribe((response) => {
        // Capture route parameter 'dynamic'
        this.route.paramMap.subscribe((params) => {
          let hashId = params.get('dynamic');
          console.log('Dynamic Route Param (hashId):', hashId);

          // Handle query parameters
          this.route.queryParams.subscribe((p) => {
            this.userId = p['cId'] || '';
            console.log('User ID:', this.userId);

            const obj = {
              userId: this.userId,
              browser: this.browser,
              browserVersion: this.browserVersion,
              os: this.os,
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
                  if (response.Link && typeof response.Link === 'string') {
                    // Redirect to the Link
                    window.location.href = response.Link;
                  }
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
