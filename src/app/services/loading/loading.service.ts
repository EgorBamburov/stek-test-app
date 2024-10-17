import {Injectable, signal} from "@angular/core";
import {LoadingController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loader!: HTMLIonLoadingElement;
  constructor(private loadingController: LoadingController) {
  }

  public async isLoading(status: boolean) {
    if (status) {
      this.loader = await this.loadingController.create()
    }

    if (status) {
      this.loader.present()
    } else {
      this.loader.dismiss()
    }
  }
}
