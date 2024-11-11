import { inject, Injectable } from "@angular/core";
import { IIService } from "../ic.service";
import { Actor } from "@dfinity/agent";
import { environment } from "../../environments/environment";
import { AuthClient } from "@dfinity/auth-client";



@Injectable({providedIn: 'root'})
export class AuthService {
    private readonly CANISTER_ID_BACKEND = environment.INTERNET_IDENTITY_CANISTER_ID;
    private readonly DFX_NETWORK = environment.DFX_NETWORK;
    
    private iiService = inject(IIService);

    actor$$: Promise<Actor>;

    constructor() {
        this.actor$$ = this.iiService.createActor({});
    }

    get authUrl() {
        let iiUrl;
        if (this.DFX_NETWORK === "local") {
            iiUrl = `http://localhost:4943/?canisterId=${this.CANISTER_ID_BACKEND}`;
        } else if (this.DFX_NETWORK === "ic") {
            iiUrl = `https://${this.CANISTER_ID_BACKEND}.ic0.app`;
        } else {
            iiUrl = `https://${this.CANISTER_ID_BACKEND}.dfinity.network`;
        }

        return iiUrl;
    }

    async login() {
        const authClient = await AuthClient.create();
        return new Promise((resolve, reject) => {
            authClient.login({
              identityProvider: this.authUrl,
              onSuccess: resolve,
              onError: reject,
            });
          });
    }


}