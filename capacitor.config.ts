import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aiya.nuxtweather',
  appName: 'Taiwan Weather Inquiry',
  webDir: '.output/public',
  plugins: {
    Keyboard: {
          resizeOnFullScreen: true,
        },
  }
};

export default config;
