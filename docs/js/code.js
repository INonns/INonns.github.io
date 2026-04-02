//#region Declaracion de variables
const btResistSection = document.getElementById("resist_section_bt");
const btCurrSection = document.getElementById("curr_section_bt");
const btVoltSection = document.getElementById("volt_section_bt");

const resSeries = document.getElementById("res_series");
const resParalel = document.getElementById("res_paralel");

//Secciones
    const stMain = document.getElementById("main_section");
    const stCalculator = document.getElementById("calculator_section");
    const stResistences = document.getElementById("resistences_section");
    const stCurrent = document.getElementById("currents_section");
    const stVoltages = document.getElementById("voltages_section")

    //Seccion de resistencias
        // Para calcular valor de la resistencia por codigo de colores
            const inColorOne = document.getElementById("in_c1");
            const inColorTwo = document.getElementById("in_c2");
            const inColorThree = document.getElementById("in_c3");
            const inColorFour = document.getElementById("in_c4");

            const btResistVl = document.getElementById("bt_resist_vl");
            const innerResistence = document.getElementById("resistence_value");

    //Seccion de corrientes
            //Para calcular corriente en serie
                const inCurrentVolt = document.getElementById("in_voltage_curr");
                const inCurrentResist = document.getElementById("in_resistence_curr");
                const btCurrent = document.getElementById("bt_current");
                const innerCurrent = document.getElementById("current_sr");

            //Para calcular corriente en paralelo
                const currParalel = document.getElementById("current_paralel")

    //Seccion de voltajes
            //Para calcular voltaje en serie
                const inVoltageCurr = document.getElementById("in_current_volt");
                const inVoltageResist = document.getElementById("in_resistence_volt");
                const btVoltage = document.getElementById("bt_voltage");
                const innerVoltage = document.getElementById("voltage_sr");

            //Para calcular voltaje en paralelo
                const voltParalel = document.getElementById("voltage_paralel");
//#endregion

//#region Las funciones para calcular resistencias
    function resistences_quantity_inputs() {
        //Definir cuantas resistencias se van a emplear en serie
            let nmRss = parseInt(prompt("¿Cuantas resistencias son?"));
            let inputs = "";
            let buttons = "";

            for (let i = 1; i < (nmRss+1); i++) {
                inputs = `
                <div class="input-label">
                    <input type="text" name="resist_${i}" id="in_sr_resist${i}" autocomplete="off" required="" placeholder="Resistencia (${i})">
                    <label for="in_sr_resist${i}"> </label> <br> <br>
                </div>`;
                resSeries.innerHTML += inputs;
            }
            buttons = `<button id="bt_resr"> Calcular Resistencia Equivalente </button>
                <p id="resist_sr"></p>
`;
            resSeries.innerHTML += buttons;

        //Definir cuantas resistencias se van a emplear en paralelo
            for (let i = 1; i < (nmRss+1); i++) {
                inputs = `
                <div class="input-label">
                    <input type="text" name="req_resist_${i}" id="in_pl_resist${i}" autocomplete="off" required="" placeholder="Resistencia (${i})">
                    <label for="in_pl_resist${i}" id="lb_pl"> </label> <br> <br>
                </div>`; 
                resParalel.innerHTML += inputs;
            }
            buttons = `<button id="bt_repl"> Calcular Resistencia Equivalente </button>
                <p id="resist_pl"></p>`;
            resParalel.innerHTML += buttons; 

            resistences_in_series(nmRss);
            resistences_in_paralel(nmRss);
    }

    function resistences_in_series(nmResists) {
        //Empezar a calcular la resistencia equivalente en serie
            const btResSr = document.getElementById("bt_resr");
            const innerResSr = document.getElementById("resist_sr")

            btResSr.addEventListener("click", function() {
                let resistencias_serie = [];

                for (let i = 1; i < (nmResists+1); i++) {
                    let r = document.getElementById(`in_sr_resist${i}`).value;
                    resistencias_serie.push(parseInt(r));
                }

                //Hallar resistencia equivalente en serie
                    let sum = resistencias_serie.reduce((acc, num) => acc + num, 0);
                    innerResSr.innerHTML = ("La resistencia equivalente en serie es de " + sum + " Ω")
            })
    }

    function resistences_in_paralel(nmResists) {
        //Empezar a calcular la resistencia equivalente en paralelo
            const btResPl = document.getElementById("bt_repl");
            const innerResPl = document.getElementById("resist_pl");

            btResPl.addEventListener("click", function() {
                let resistencias_paralelo = [];

                for (let i = 1; i < (nmResists+1); i++) {
                    let r = document.getElementById(`in_pl_resist${i}`).value;
                    resistencias_paralelo.push(parseInt(r));
                }

            //Hallar resistencia equivalente en paralelo
                let sumaInversos = resistencias_paralelo.reduce((acc, r) => acc + (1 / r), 0);
                let resistencePl = sumaInversos === 0 ? Infinity : 1 / sumaInversos;
                let resistencePlRound = Math.round(resistencePl * 100) / 100;
                innerResPl.innerHTML = ("La resistencia equivalente en paralelo es de " + resistencePlRound + " Ω")
        })
    }

    function calculate_res_value() {
        const clValues = {
            negro: [0, 10**0, 0], 
            cafe: [1, 10**1],
            rojo: [2, 10**2],
            naranja: [3, 10**3],
            amarillo: [4, 10**4],
            verde: [5, 10**5],
            azul: [6, 10**6],
            violeta: [7, 10**7],
            gris: [8, 10**8],
            blanco: [9, 10**9],
            dorado: [0, 10**-1],
            plateado: [0, 10**-2],
        }

        let clvKeys = Object.keys(clValues);

        let c1 = search_color(clvKeys, inColorOne, clValues, 0);
        let c2 = search_color(clvKeys, inColorTwo, clValues, 0);
        let c3 = search_color(clvKeys, inColorThree, clValues, 1);
        let c4 = inColorFour.value;

        let rv = parseInt(String(c1) + String(c2)) * c3;
        innerResistence.innerHTML = ("El valor de la resistencia equivalente es de: " + rv + " Ω"); 
    }
//#endregion

//#region Funciones para el voltaje
    function voltage_quantity_inputs() {
        let nmVlts = parseInt(prompt("¿Cuantos voltajes desea calcular?"));
        let elements = "";

        for (let i = 1; i < (nmVlts+1); i++) {
            elements = `
            <!-- Calcular Voltaje ${i} -->
                <label for="in_current_volt_${i}"> El valor de la corriente (${i}) = </label>
                <input type="text" name="voltages" id="in_current_volt_${i}" placeholder="Ingresa el valor"> <br> <br>
                <label for="in_resistence_volt_${i}"> El valor de la resistencia (${i}) = </label>
                <input type="text" name="resist" id="in_resistence_volt_${i}" placeholder="Ingresa el valor"> <br> <br>

                <button id="bt_voltage_${i}" 
                        onclick="voltage_in_paralel(in_current_volt_${i}, in_resistence_volt_${i}, voltage_pl_${i}, ${i})"> 
                Calcular Voltaje </button>
                
                <p id="voltage_pl_${i}"></p>`;

            voltParalel.innerHTML += elements;
        }
    }

    function voltage_in_series(inputCurrent, inputResist) {
        let voltage = (inputCurrent.value * inputResist.value);
        let voltageRound = Math.round(voltage * 100) / 100;
            return("El voltage calculado es de: " + voltageRound + " V");
    }

    function voltage_in_paralel(inputCurrent, inputResistence, innerElement, order) {
        let voltagePl = (inputCurrent.value * inputResistence.value);
        let voltagePlRound = Math.round(voltagePl * 100) / 100;
        innerElement.innerHTML = ("El voltaje " + order + " es de: " + voltagePlRound + " Voltios");
    }
//#endregion

//#region Funcion para la corriente
    function current_quantity_inputs() {
        let nmCts = parseInt(prompt("¿Cuantas corrientes desea calcular?"));
        let elements  = "";

        for (let i = 1; i < (nmCts+1); i++) {
            elements =  `
            <!-- Calcular corriente ${i} -->
                <label for="in_voltage_curr${i}"> El valor del voltage (${i}) = </label>
                <input type="text" name="voltages" id="in_voltage_curr${i}" placeholder="Ingresa el valor"> <br> <br>
                <label for="in_resistence_curr${i}"> El valor de la resistencia (${i}) = </label>
                <input type="text" name="resist" id="in_resistence_curr${i}" placeholder="Ingresa el valor"> <br> <br>

                <button id="bt_current_${i}" 
                        onclick="current_in_paralel(in_voltage_curr${i}, in_resistence_curr${i}, curr_pl_${i}, ${i})"
                > Calcular Corriente </button>

                <p id="curr_pl_${i}"></p> `;

            currParalel.innerHTML += elements;
        }
    }

    function current_in_series(inputVolt, inputResist) {
        let current = (inputVolt.value / inputResist.value);
        let currentRound = Math.round(current * 100) / 100;
            return ("La corriente calculada es de: " + currentRound + " Amperios");
    }

    function current_in_paralel(inputVoltage, inputResistence, innerElement, order) {
        let currentPl = (inputVoltage.value / inputResistence.value);
        let currentPlRound = Math.round(currentPl * 100) / 100;
        innerElement.innerHTML = ("La corriente " + order + " es de: " + currentPlRound + " Amperios")
    }
//#endregion

//#region Funciones por DRY
    function search_color(keys, input, object, val) {
        for (let i = 0; i < keys.length; i++) {
            if (String(input.value).toLowerCase() == keys[i]) {
                const pos = keys[i];
                const posVal = object[pos];
                
                const cvar = posVal[val];
                return (cvar)
            }
        }
    }
//#endregion

//#region  Ejecutando funciones por botones
    //Seccion de Resistencias
        btResistSection.addEventListener("click", function() {
            stMain.style.display = "none";
            stCalculator.style.display = "block";
            stCurrent.style.display = "none";
            stVoltages.style.display = "none";

            resistences_quantity_inputs();
            btResistVl.addEventListener("click", calculate_res_value);
        })

    //Seccion de Corriente
        btCurrSection.addEventListener("click", function() {
            stMain.style.display = "none";
            stCalculator.style.display = "block";
            stResistences.style.display = "none";
            stVoltages.style.display = "none";
            
            current_quantity_inputs();
            btCurrent.addEventListener("click", () => {innerCurrent.innerHTML = current_in_series(inCurrentVolt, inCurrentResist)});
        })

    //Seccion de Voltaje
        btVoltSection.addEventListener("click", function() {
            stMain.style.display = "none";
            stCalculator.style.display = "block";
            stResistences.style.display = "none";
            stCurrent.style.display = "none";

            voltage_quantity_inputs();
            btVoltage.addEventListener("click", () => {innerVoltage.innerHTML = voltage_in_series(inVoltageCurr, inVoltageResist)});
        })
//#endregion