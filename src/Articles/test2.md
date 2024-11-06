# rött på APIMstandardfel? Så här får du full kontroll med <on-error>

Det började med ett välbekant problem för alla som använder Azure API Management (APIM) – de standardiserade felmeddelandena. När något går fel får du snygga men vaga meddelanden som gör det svårt att förstå vad som egentligen hände. För en utvecklare som vill ha tydliga svar och spårbarhet kan det vara otroligt frustrerande.

Om du, liksom de flesta, inte är särskilt förtjust i de standardfelmeddelanden som Azure API Management (APIM) levererar, och dessutom inte har möjlighet att tracera, har Mojtaba en tips som kan underlätta: använd <on-error>-sektionen i APIM.

Med hjälp av <on-error> kan du anpassa hur fel hanteras. Du kan till exempel sätta egna response-headers när ett fel uppstår, vilket ger dig bättre kontroll och flexibilitet i hur felmeddelanden ser ut. Detta kan vara särskilt användbart om du vill ge mer specifik feedback till den som använder din API-tjänst, eller om du vill samla in mer detaljerad information när något går snett.

Utöver att hantera headers finns det många andra saker du kan göra med <on-error>, så det är värt att experimentera och se vilka lösningar som fungerar bäst för ditt scenario.


![image](https://github.com/user-attachments/assets/1eeba821-ba18-4c12-a6e7-3b925bce9707)


Men denna grundläggande förbättring togs ännu längre av en annan utvecklare Sebastian, som insåg att man också kunde använda Context.LastError-headers för att samla ännu mer detaljerad information om vad som faktiskt gick fel. Genom att integrera detta med en Nodinite Logging policy fragment, skapade de en lösning som loggar felen som Context Values. Det innebär att alla fel nu kan läsas av direkt i Event-detaljerna, vilket dramatiskt förenklar felsökningsprocessen.

 
![image](https://github.com/user-attachments/assets/c05796c4-12b6-4a75-91a4-568b5befd455)

 

![image](https://github.com/user-attachments/assets/580b78b0-425e-4638-97f9-6f62b7415455)


Kudos till: Mojtaba Rezaei och Sebastian Wesselhoff

Denna lösning är inskickad av Mojtaba Rezaei och Sebastian Wesselhoff, två utvecklare som har hittat ett sätt att optimera felhanteringen i APIM. Stort tack för att ni delar med er!
