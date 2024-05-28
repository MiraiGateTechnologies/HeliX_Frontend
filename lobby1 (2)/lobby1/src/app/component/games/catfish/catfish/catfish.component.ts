import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../service/auth.service';
import {Router} from '@angular/router';
import {NgIf, NgStyle} from "@angular/common";

declare var createUnityInstance: any;

@Component({
  selector: 'app-catfish',
  standalone: true,
  imports: [
    NgStyle,
    NgIf
  ],
  templateUrl: './catfish.component.html',
  styleUrl: './catfish.component.css'
})
export class CatfishComponent implements OnInit {
  private unityInstance: any = null;
  user: any;
  loadingProgress = 0;

  constructor(private authService: AuthService, private router: Router) {
  }


  ngOnInit(): void {
    this.getCurrentUser();
    createUnityInstance(document.querySelector("#unityCanvas"), {
      dataUrl: "assets/catfish/build.data",
      frameworkUrl: "assets/catfish/build.framework.js",
      codeUrl: "assets/catfish/build.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "YourCompagny",
      productName: "yourProjectName",
      productVersion: "1.0"
    }, (progress: number) => {
      // console.log(progress)
      this.loadingProgress = parseInt((100 * progress).toFixed(2))
    }).then((unityInstance: any) => {
      this.unityInstance = unityInstance
      unityInstance.SendMessage('APIManager', 'GetTokan', this.authService.getToken());

    });


  }


  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error: any) => {
        this.router.navigate(['/validate']);

      }
    });
  }


  doLogout(): void {
    try {
      this.authService.removeToken();
      this.router.navigate(['/luxcasino/login']);
    } catch (error) {
      console.log(error);
      this.notify("something went wrong");
    }
  }

  notify(message: string): void {

  }
}
