# Echtzeit-Computergrafik
Repository für das Modul Echtzeit-Computergrafik an der Hochschule Furtwangen.

## Abschlussaufgabe
![1](https://user-images.githubusercontent.com/48796225/126495268-22ae5a14-a27c-4001-abd6-fdc1af15890c.PNG)

Eine Art Pen-&-Paper-Game auf Grundlage von WebGL war das Ziel meiner Abschlussaufgabe.
Diese sollte nicht nur als standardmäßige Webanwendung funktionieren, sondern auch eine AR-Oberfläche besitzen.

**[Direktlink zur Anwendung](https://tobias-bodmer.github.io/Echtzeit-Computergrafik/Abschluss/)**

Weiter finden Sie eine Erläuterung der Struktur der Scripte und eine Erklärung zweier Funktionen.

## Methodik

### Technologien
* **[ThreeJS](https://threejs.org/)**
* **[jQuery](https://jquery.com/)**
* **[simplexNoiseJS](https://github.com/jwagner/simplex-noise.js/)**

### Klassenaufteilung

Meine Klassen sind innerhalb der Abschlussaufgabe in kleiner Sub-Klassen unterteilt, 
um den Überblick zu sichern und die Hauptklasse nicht zu strecken.
Hierbei habe ich zwischen Komponenten und System Sub-Klassen unterschieden.
Die Hauptklasse der Anwendung ist die RTCG.js - die main.js verwaltet Events und das Starten der Anwendung.

Innerhalb meiner Klassen möchte ich auf zwei der schwierigeren Funktionen eingehen, um diese zu erklären.
Die Event-Funktion onMouseDown und die createGameBoard Funktion.

### onMouseDown
Diese Funktion errechnet mit den Maus (oder auch Touch) x- und y-Koordinaten das angewählte Objekt.
Hierfür verwende ich einen Ray cast der durch die Kamera in den Raum projiziert wird und werte dann die Schnittpunkte aus.

Ist der erste Schnittpunkt ein Gegner so wird der Player direkt vor ihn platziert und einem Kampf wird ausgelöst
(dies funktioniert nur außerhalb von AR da hierfür ein ```Div-Element``` über den Canvas gelegt wird welcher den Kampfablauf ermöglicht).

![Kampfdemo-Ansicht](https://user-images.githubusercontent.com/48796225/126493221-d4b87c1f-8ec3-4a22-9fd3-c0ea2fc274ec.PNG)

Ist der erste Schnittpunkt das Spielbrett so bewegt sich der Player auf die ausgewählte Position der Höhe des Spielfeldes entsprechend
(dies funktioniert auch innerhalb von AR).

Diese Funktion wurde so aufgebaut, da sie so höchst effizient ist. Sie verwendet das Eventsystem des Browsers und wird durch ein "Click" oder 
"Touch"-Event ausgelöst auch die Ray cast sind die kostengünstigste Möglichkeit, um Schnittpunkte zu bestimmen. 
Das Überlegen der ```Divs``` ermöglicht einen schnellen Wechsel zwischen Anwendung und Kampf was auch wiederum die Ressourcen einspart, 
da keins der Elemente innerhalb von WebGL gerendert und verwaltet werden muss.

### createGameBoard
Diese Funktion generiert das Spielbrett, welches aus einer generierten Textur, einer generierten Oberfläche und Partikel Effekten aus Steinen besteht.

Ich verwende SimplexNoise, um mir eine ```Noise-Map``` generieren zu lassen. Diese verwende ich dann in der ```textureGenerator``` Funktion, 
um mir eine gefärbte Textur zu erstellen. Dabei schaue ich mir die Intensität der Noise-Map an einer x-, y-Koordinate an und 
errechne mir damit die Farbgebung an diesem Punkt. Ist die Intensität besonders niedrig, dann färbe ich den Untergrund in ein 
abhängiges Grün, ansonsten in ein abhängiges vom intensitätswert Braun.

Dann geht es weiter mit der ```worldGenerator``` Funktion diese verändert zu jedem intensitätswert die Höhe des Vertex der Plane, um eine bergige Landschaft zu erstellen.

Zum Schluss werden noch Steine dem Spielbrett zugefügt, wofür die ```stonesGenerator``` Funktion zuständig ist.
Diese verwendet das Partikel oder auch Point-System von ThreeJS. Ich vergebe zufällige Positionen und errechne mir die Höhe von dem Vertex der Plane,
sodass die Steine auch auf dem Spielbrett liegen und nicht darunter. Ein Texturloader fügt eine der beiden Steintexturen dem Point-System hinzu 
und schon sind auch die Steine fertig.

Zurückgegeben wird ein fertig erzeugtes Spielbrett mit generierter Oberfläche und Textur und variable platzierten Steinen.

## Performance
Über eine ```FPS-Anzeige``` habe ich auch die Performance meiner Anwendung getestet.

Diese lag nur innerhalb des Seitenaufbaus unterhalb 60FPS und ist damit stabil und völlig ausreichend für ein im Browser lauffähiges Pen-&-Paper-Game.
