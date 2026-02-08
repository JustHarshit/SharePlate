import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  "appId": "com.shareplate.app",
  "appName": "SharePlate",
  "webDir": "build",
  "bundledWebRuntime": false,
  "server": {
    "androidScheme": "https"
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000,
      "backgroundColor": "#003366",
      "showSpinner": false
    }
  }
}

export default config;
