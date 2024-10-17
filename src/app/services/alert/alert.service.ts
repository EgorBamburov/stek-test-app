import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  public async showErrorAlert( message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Ошибка',
      message,
      buttons: ['Ок']
    })

    alert.present()
  }
}
