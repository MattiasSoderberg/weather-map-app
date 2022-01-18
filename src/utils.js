export const accuweatherAPI_KEY = "1l6ZgytxUpdAMejHU0xoGC5pDZbS33q5"
export const accuWeather_BASE_URL = "http://dataservice.accuweather.com"

export const temperatureColor = (temp) => {
    const tempColors = {
        minusFiftheen: "18ccf0",
        minusFive: "a1e2f0",
        fiveToFive: "e3fffe",
        plusFive: "ffeb7a",
        plusFiftheen: "ffaf38",
        plusTwentyFive: "ff6a38"
    }

    if (temp <= -15) return tempColors.minusFiftheen
    else if (temp < -5 && temp > -15) return tempColors.minusFive
    else if (temp > -5 && temp < 5) return tempColors.fiveToFive
    else if (temp >= 5 && temp < 15) return tempColors.plusFive
    else if (temp >= 15 && temp < 25) return tempColors.plusFiftheen
    else if (temp >=25) return tempColors.plusTwentyFive
}