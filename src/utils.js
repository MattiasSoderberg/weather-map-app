export const accuWeather_BASE_URL = "https://dataservice.accuweather.com"

export const temperatureColor = (temp) => {
    const tempColors = {
        minusFiftheen: "2487b5",
        minusFive: "a1e2f0",
        fiveToFive: "e1f3fc",
        plusFive: "E9C46A",
        plusFiftheen: "F4A261",
        plusTwentyFive: "E76F51"
    }

    if (temp <= -15) return tempColors.minusFiftheen
    else if (temp <= -5 && temp > -15) return tempColors.minusFive
    else if (temp > -5 && temp < 5) return tempColors.fiveToFive
    else if (temp >= 5 && temp < 15) return tempColors.plusFive
    else if (temp >= 15 && temp < 25) return tempColors.plusFiftheen
    else if (temp >=25) return tempColors.plusTwentyFive
}