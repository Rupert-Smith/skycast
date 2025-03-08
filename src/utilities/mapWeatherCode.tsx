import { ReactComponent as ClearSky } from "../assets/icons/day/clear.svg";
import { ReactComponent as MainlyClear } from "../assets/icons/day/mostlysunny.svg";
import { ReactComponent as PartlyCloudy } from "../assets/icons/day/partlycloudy.svg";
import { ReactComponent as Overcast } from "../assets/icons/day/cloudy.svg";
import { ReactComponent as Fog } from "../assets/icons/day/fog.svg";
import { ReactComponent as ChanceRain } from "../assets/icons/day/chancerain.svg";
import { ReactComponent as ChanceSleet } from "../assets/icons/day/chancesleet.svg";
import { ReactComponent as Rain } from "../assets/icons/day/rain.svg";
import { ReactComponent as Sleet } from "../assets/icons/day/sleet.svg";
import { ReactComponent as Snow } from "../assets/icons/day/snow.svg";
import { ReactComponent as ChanceSnow } from "../assets/icons/day/chancesnow.svg";
import { ReactComponent as Thunderstorm } from "../assets/icons/day/tstorms.svg";

export const weatherCodeMap: {
  [key: number]: { description: string; icon: React.ReactNode; color: string };
} = {
  0: { description: "Clear sky", icon: <ClearSky />, color: "yellow" },
  1: { description: "Mainly clear", icon: <MainlyClear />, color: "yellow" },
  2: { description: "Partly cloudy", icon: <PartlyCloudy />, color: "yellow" },
  3: { description: "Overcast", icon: <Overcast />, color: "grey" },
  45: { description: "Fog", icon: <Fog />, color: "grey" },
  48: { description: "Depositing rime fog", icon: <Fog />, color: "grey" },
  51: { description: "Light drizzle", icon: <ChanceRain />, color: "grey" },
  53: { description: "Moderate drizzle", icon: <ChanceRain />, color: "grey" },
  55: { description: "Dense drizzle", icon: <ChanceRain />, color: "grey" },
  56: {
    description: "Light freezing drizzle",
    icon: <ChanceSleet />,
    color: "grey",
  },
  57: {
    description: "Dense freezing drizzle",
    icon: <ChanceSleet />,
    color: "grey",
  },
  61: { description: "Slight rain", icon: <Rain />, color: "grey" },
  63: { description: "Moderate rain", icon: <Rain />, color: "grey" },
  65: { description: "Heavy rain", icon: <Rain />, color: "grey" },
  66: { description: "Light freezing rain", icon: <Sleet />, color: "grey" },
  67: { description: "Heavy freezing rain", icon: <Sleet />, color: "grey" },
  71: { description: "Slight snow fall", icon: <Snow />, color: "white" },
  73: { description: "Moderate snow fall", icon: <Snow />, color: "white" },
  75: { description: "Heavy snow fall", icon: <Snow />, color: "white" },
  77: { description: "Snow grains", icon: <Snow />, color: "white" },
  80: {
    description: "Slight rain showers",
    icon: <ChanceRain />,
    color: "grey",
  },
  81: {
    description: "Moderate rain showers",
    icon: <ChanceRain />,
    color: "grey",
  },
  82: {
    description: "Violent rain showers",
    icon: <ChanceRain />,
    color: "grey",
  },
  85: {
    description: "Slight snow showers",
    icon: <ChanceSnow />,
    color: "white",
  },
  86: {
    description: "Heavy snow showers",
    icon: <ChanceSnow />,
    color: "white",
  },
  95: {
    description: "Thunderstorm: Slight or moderate",
    icon: <Thunderstorm />,
    color: "black",
  },
  96: {
    description: "Thunderstorm with slight hail",
    icon: <Thunderstorm />,
    color: "black",
  },
  99: {
    description: "Thunderstorm with heavy hail",
    icon: <Thunderstorm />,
    color: "black",
  },
};
