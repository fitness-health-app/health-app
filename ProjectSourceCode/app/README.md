# Health App

This is a mobile application designed to help users track their fitness and diet.

## Development

### Setting up the environment

To set up the environment for this app, follow these steps:

- Create a .env file in the root directory of the React Native source code.
- In the .env file, replace "YOUR_API_KEY" with your actual API key.

```properties
API_URL=YOUR_API_KEY
```

### Android setup

- To set up an Android emulator for this app, follow these steps:

- Install Android Studio.
- Use the Virtual Device Manager in Android Studio to create an emulator.
- Select Pixel 5 or a newer version.
- Select Tiramisu (API level 33).
- Rename your emulator if necessary.
- Click Finish to complete the setup.

### Running the development server

To run the development server on an Android emulator, use the following command:

```properties
npm run start-android
```

This will start the emulator and development server for the Health App.
