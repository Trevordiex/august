import { inject } from "@angular/core";
import { CanMatch, GuardResult, MaybeAsync, Route, UrlSegment } from "@angular/router";
import { AuthService } from "../services/auth.service";

// export class AuthGuard implements CanMatch {
//     private authService = inject(AuthService);
  
//     canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
//         this.authService.actor$$.
//     }
// }