# 🌤️ Weather Dashboard

A responsive weather dashboard built with **React.js + Tailwind CSS**, featuring real-time weather data and a 14-day forecast powered by the [WeatherAPI.com Forecast API](https://www.weatherapi.com/).

Additionally, the app uses **Geolocation** to get the current location of the user and display weather data based on their location.

---

## 🔍 Features

- 🔎 **City Search** – Enter any location to get accurate weather data.
- 🌡️ **Current Weather** – Temperature, humidity, wind speed, and weather condition for the selected city or current location.
- 📅 **14-Day Forecast** – Displays upcoming weather trends for the next 3 days.
- 🌍 **Current Location Access** – Automatically detects and shows weather for the user’s current location.
- ⚙️ **Fast and Lightweight** – Built with React + Vite for blazing speed.

---
## Screen snippets
<img width="960" alt="{86B093FA-D228-4963-B394-51D32C63639C}" src="https://github.com/user-attachments/assets/93030f00-7694-414d-834d-3992a1dd1b6b" />
<img width="960" alt="{04EBF039-2CEE-4599-B841-D732FDBD8C00}" src="https://github.com/user-attachments/assets/44702853-ec05-4e8f-90e2-840a1b41fa9d" />

### Using Geolocation
<img width="960" alt="{C7E2B00C-30E8-462E-A800-2E034A536915}" src="https://github.com/user-attachments/assets/4ade62ef-33ef-4a83-be9e-825b8252dd87" />

## 🧰 Built With

- ⚛️ [React.js](https://reactjs.org/)
- ⚡ [Vite](https://vitejs.dev/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 🌦️ [WeatherAPI.com Forecast API](https://www.weatherapi.com/)
  
---

## 📦 Installation & Setup

To get started, clone the repository and follow the steps below:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/Weather-Dashboard.git
cd weather-dashboard

# 2. Install dependencies
npm install

# 3. Create a `.env` file in the root directory and add your API key
echo "VITE_WEATHER_API_KEY=your_api_key_here" > .env

# 4. Start the development server
npm run dev
````

---

## 🔑 API Key Setup

1. Go to [WeatherAPI.com](https://www.weatherapi.com/) and sign up for a free API key.
2. In the root of your project, create a `.env` file and add:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

3. Access it in your React code:

```js
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
```

---

## 🙏 Acknowledgements

* [WeatherAPI.com](https://www.weatherapi.com/) – for providing the weather data.
* [React.js](https://reactjs.org/) – the framework used to build the app.
* [Vite](https://vitejs.dev/) – for fast development build.
* [Tailwind CSS](https://tailwindcss.com/) – for responsive and easy styling.

