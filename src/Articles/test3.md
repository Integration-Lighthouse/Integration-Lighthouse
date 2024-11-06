# Är du en ny utvecklare och osäker på hur du sätter upp Logic App lokalt? Här är en enkel steg-för-steg guide från Daniel

Att sätta upp lokal utveckling för Logic App Standard kan kännas lite överväldigande, särskilt om du är ny i verktyget. Men oroa dig inte! Daniel har satt ihop en enkel guide som hjälper dig att komma igång snabbt och smidigt.

Så här gör du:
Öppna Lokal Designer
För att öppna den lokala designern bör följande steg följas.

1. Se till att den senaste versionen av Azure Functions Core Tools är installerad på din lokala maskin.

2. Se till att du har Azurite-tjänsterna installerade på din lokala maskin.

3. Installera Azure Logic App (Standard) tillägget i VS Code.

4. Verifiera att följande inställningar är som följer:

		a. Azure Logic Apps Standard: Auto Runtime Dependencies Path bör vara inställt på blank.
![image](https://github.com/user-attachments/assets/70d06f94-6c90-434d-b722-1b2a0586dab4)

		b. Azure Logic Apps Standard: Auto Runtime Dependencies Validation and Installation bör vara inaktiverad.
![image](https://github.com/user-attachments/assets/a306af6b-81a7-40c1-a70b-268aaecfad7c)

		c. Azure Logic Apps Standard: Auto Start Design Time bör vara inaktiverad.
![image](https://github.com/user-attachments/assets/8bcb9107-cd15-4eb3-a9c3-2f34441d466c)

		d. Azure Logic Apps Standard: Dotnet Binary Path Det bör ställas in på dotnet.
![image](https://github.com/user-attachments/assets/92979a82-c030-415b-b818-c49f41bbf1f6)

		e. Azure Logic Apps Standard: Func Core Tools Binary Path Det bör ställas in på func.
![image](https://github.com/user-attachments/assets/c93f5e51-2a89-498b-b06d-23037b7d3c6d)

6. Från en terminal, kör följande kommando:
	func host start --port 8000
	Portparametern är avgörande och bör ställas in på 8000 (åttatusen), eftersom det är den port som designtiden försöker ansluta till.

![image](https://github.com/user-attachments/assets/412e747e-55cd-4345-91f1-99d8df4d56a1)

8. Högerklicka på ditt arbetsflöde och välj "Open Designer" från snabbmenyn.
   
![image](https://github.com/user-attachments/assets/330272b7-9924-4fa3-ad82-6da18eafc837)

Redigera ditt arbetsflöde så mycket du vill!
Observera att värden måste vara igång under denna tid, annars kommer designern att sluta fungera.

Kudos till: Daniel Åslund, som alltid hjälper andra och gör det enklare för dem att arbeta med nya verktyg.
