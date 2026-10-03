import { 
  Cinzel, 
  Cormorant, 
  Orbitron, 
  Rajdhani, 
  Share_Tech_Mono, 
  Press_Start_2P, 
  Exo_2, 
  Bebas_Neue, 
  Playfair_Display, 
  Space_Grotesk, 
  VT323, 
  JetBrains_Mono, 
  Inter, 
  Caveat, 
  Special_Elite, 
  Libre_Baskerville, 
  Plus_Jakarta_Sans, 
  Sora, 
  IBM_Plex_Mono, 
  Lora, 
  Bungee, 
  Poppins, 
  Bodoni_Moda, 
  Archivo, 
  Courier_Prime, 
  Anton 
} from "next/font/google";

export const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
export const cormorant = Cormorant({ subsets: ["latin"], variable: "--font-cormorant", weight: ["300", "400", "600"] });
export const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
export const rajdhani = Rajdhani({ subsets: ["latin"], variable: "--font-rajdhani", weight: ["400", "500", "600", "700"] });
export const shareTechMono = Share_Tech_Mono({ subsets: ["latin"], variable: "--font-share-tech-mono", weight: "400" });
export const pressStart2P = Press_Start_2P({ subsets: ["latin"], variable: "--font-press-start", weight: "400" });
export const exo2 = Exo_2({ subsets: ["latin"], variable: "--font-exo2" });
export const bebasNeue = Bebas_Neue({ subsets: ["latin"], variable: "--font-bebas-neue", weight: "400" });
export const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
export const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
export const vt323 = VT323({ subsets: ["latin"], variable: "--font-vt323", weight: "400" });
export const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
export const specialElite = Special_Elite({ subsets: ["latin"], variable: "--font-special-elite", weight: "400" });
export const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], variable: "--font-libre-baskerville", weight: ["400", "700"] });
export const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });
export const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
export const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-ibm-plex-mono", weight: ["400", "500"] });
export const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
export const bungee = Bungee({ subsets: ["latin"], variable: "--font-bungee", weight: "400" });
export const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["300", "400", "500", "600"] });
export const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni" });
export const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });
export const courierPrime = Courier_Prime({ subsets: ["latin"], variable: "--font-courier-prime", weight: ["400", "700"] });
export const anton = Anton({ subsets: ["latin"], variable: "--font-anton", weight: "400" });

export const fontVariables = [
  cinzel.variable,
  cormorant.variable,
  orbitron.variable,
  rajdhani.variable,
  shareTechMono.variable,
  pressStart2P.variable,
  exo2.variable,
  bebasNeue.variable,
  playfair.variable,
  spaceGrotesk.variable,
  vt323.variable,
  jetbrains.variable,
  inter.variable,
  caveat.variable,
  specialElite.variable,
  libreBaskerville.variable,
  plusJakarta.variable,
  sora.variable,
  ibmPlexMono.variable,
  lora.variable,
  bungee.variable,
  poppins.variable,
  bodoni.variable,
  archivo.variable,
  courierPrime.variable,
  anton.variable,
].join(" ");
