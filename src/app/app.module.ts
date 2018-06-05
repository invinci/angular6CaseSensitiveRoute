import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { TranslateModule } from "@ngx-translate/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { environment } from "@env/environment";
import { CoreModule } from "@app/core";
import { SharedModule } from "@app/shared";
import { HomeModule } from "./home/home.module";
import { AboutModule } from "./about/about.module";
import { LoginModule } from "./login/login.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { DefaultUrlSerializer, UrlSerializer, UrlTree } from "@angular/router";

export class TitleCaseUrlSerializer extends DefaultUrlSerializer {
  public parse(url: string): UrlTree {
    function toTitleCase(url: String) {
      return url
        .split("/")
        .map(segment => (segment ? segment[0].toUpperCase() + segment.substr(1) : segment))
        .join("/");
    }
    return super.parse(url);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register("./ngsw-worker.js", { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    HomeModule,
    AboutModule,
    LoginModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: UrlSerializer,
      useClass: TitleCaseUrlSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
