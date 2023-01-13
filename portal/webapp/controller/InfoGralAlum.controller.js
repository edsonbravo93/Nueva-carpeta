sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("com.udep29.InfoAlum.portal.controller.InfoGralAlum", {
            onInit: function () {

                var Data = {
                    "Estudiantes": [{
                        "NumeroIdent": "136408-0",
                        "Nombres": "Edson",
                        "Apellidos": "Bravo Zapata",
                        "nacionalidad": "Mexicana",
                        "FeNacimiendto": "01/03/1993"
                    }],
                    "Carrera": [{
                        "Carrera": "Ing. en Sistemas Computacionales"
                    }],
                    "Semestre": [{
                        "SemestreInicio": "004/2019",
                        "posicionCarrera": "254 de 628",
                        "rankingCarrera": "537.39",
                        "PromedioPonderado": "5.7",
                        "Estado": "Regular"
                    }]
                };

                // Creamos la instancia JSON model
                var oModelNew = new sap.ui.model.json.JSONModel();
                // Guardamos en objeto data en el modelo
                oModelNew.setData(Data);
                // Guardamos el modelo en el core
                sap.ui.getCore().setModel(oModelNew);

                this.getView().setModel(oModelNew);

                this.getView().setModel(new JSONModel([{},{}]), "lista");

            }
        });
    });