import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector'; // Import the library

@Component({
  selector: 'app-director',
  imports: [HttpClientModule],
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router); // Inject Router

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
          console.log('Dynamic Route Param (hashId1):', hashId);

          // Handle query parameters
          this.route.queryParams.subscribe((p) => {
            // Safely access userId and handle undefined cases
            this.userId = p['cId'] || ''; // Fallback to empty string if uId is undefined
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
                  `https://qrcode-qcnb.onrender.com/api/qrcode/scan/${hashId}`,
                  obj
                )
                .subscribe((res) => {
                  console.log('Response:', res.Link);
                  window.location.href = res.Link;
                  // Redirect the user to the received Link
                  this.router.navigateByUrl(res.Link); // Redirect to the received Link
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
