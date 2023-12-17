export class SettingsObject {
   constructor(bgColor: string, lockedIn: boolean) {
     this.bgColor = bgColor;
     this.lockedIn = lockedIn;
   }

   bgColor: string;
   lockedIn: boolean;
}