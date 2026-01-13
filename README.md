# Engineering-Unit-Converter
A professional-grade, high-precision unit conversion engine designed for engineering workflows. This application demonstrates the practical translation of core C++ programming logic into a functional web-based environment.

⚙️ Core Functionality

Multi-Category Support: Convert between geometric (length), statics (mass), and thermal (temperature) units.
+1


High-Precision Engine: Utilizes 4-decimal place floating-point precision for engineering accuracy.


Persistent Calculation Log: Automatically archives conversion history using browser local storage for data continuity.

Real-time Processing: Instantaneous calculations triggered by input event listeners.

💻 Programming Concepts Applied
In alignment with the BMKT 1723 learning objectives, this software implements:


Selection Logic (Decision Making): Complex if-else if structures are used to handle temperature scales (Celsius, Fahrenheit, Kelvin), where simple multiplication factors are insufficient.
+1


Mathematical Functions: Modular functions for thermal calculations and factor-based conversions to ensure code reusability.
+1


Input Validation & Error Handling: The system monitors for NaN (Not a Number) inputs and provides visual feedback to prevent calculation errors.
+1

Array Iteration (Loops): The conversion history is managed via a dynamic array. A loop iterates through this array to generate and render the history log table.
+1

🛠️ Technical Stack

Structure: HTML5 


Styling: CSS3 (Industrial/Classic Engineering Theme) 


Logic: JavaScript (ES6) 

🤖 AI Development Documentation

AI Tool: Gemini (Google).
+1


Interaction Process: The AI was used to generate the initial structural framework and style components..


Modifications: I manually refactored the temperature conversion functions and integrated the localStorage logic to meet specific data persistence requirements.


Challenges: Synchronizing the dropdown selection menus with the conversion factor objects required iterative testing of JavaScript object accessors..

📂 Repository Structure
index.html: UI structure and data input fields.

style.css: Professional drafting-table aesthetic.

script.js: Core engineering logic, validation, and calculations.
