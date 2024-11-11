import {Component, OnInit} from '@angular/core';
import {FirebaseX} from "@ionic-native/firebase-x/ngx";
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private fbx: FirebaseX, private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.fbx.getToken()
        .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
        .catch(error => console.error('Error getting token', error));

      this.fbx.onMessageReceived()
        .subscribe(data => console.log(`User opened a notification ${data}`));

      this.fbx.onTokenRefresh()
        .subscribe((token: string) => console.log(`Got a new token ${token}`))
    })
  }
}
