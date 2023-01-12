sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
    "sap/m/PDFViewer",
    "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/ui/core/ValueState",
    "sap/m/Button",
    "sap/m/ButtonType"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, PDFViewer, Dialog, DialogType, ValueState, Button, ButtonType) {
        "use strict";

        return Controller.extend("com.udp64.liquidSueld.liquidacionsueldos.controller.liquidacionSueldos", {

             onInit: function () {
               
               // this.validacionEncuestas(this);
              
                
                 
                var ussPernrAnos = "999"; //Variable para obtener el Pernr despues con otra funcion   
                var serviceUrl = this.getOwnerComponent().getManifestObject()._oBaseUri._parts.path;
                
                //Obtener los Años del Usuario

                var anosActivo = serviceUrl + "sap/opu/odata/sap/ZGW_PAL_COLAB_SRV/UserDataSet('" + ussPernrAnos + "')/toAnos";
                var anoActivoJson = new sap.ui.model.json.JSONModel();
                this.getView().byId("ComboAnoLiquidacionInicial").setModel(anoActivoJson);
                this.getView().byId("ComboAnoLiquidacionFinal").setModel(anoActivoJson);
                anoActivoJson.loadData(anosActivo, null, false);
                anoActivoJson.getProperty("/d/results/");
                

                //Obtener Meses

                var mesesActivo = serviceUrl + "sap/opu/odata/sap/ZGW_PAL_COLAB_SRV/MesesSet";
                var mesesActivoJson = new sap.ui.model.json.JSONModel();
                this.getView().byId("ComboMesLiquidacionInicial").setModel(mesesActivoJson);
                this.getView().byId("ComboMesLiquidacionFinal").setModel(mesesActivoJson);
                mesesActivoJson.loadData(mesesActivo, null, false);
                mesesActivoJson.getProperty("/d/results/");
                
                

            },

            onBeforeRendering: function() {               
            },

            onAfterRendering: function() {    
            },
            
            onExit: function() {
            },

            validacionEncuestas: function (that) {
                    var sPathAvisos = "/sap/opu/odata/sap/ZGW_PAL_CROSS_SRV/";
                    var oModel = new sap.ui.model.odata.ODataModel(sPathAvisos, true);
                    sap.ui.getCore().setModel(oModel, "avisosModel");
                    this.getView().setModel(oModel, "avisosModel");
                    var oSuccessMessageDialog = {};
                    var test = "X";
                    var rut = "1-9";
                    var sPath = "/AvisosSet?$filter=Test eq '" + test + "' and Rol eq 'COLABORADOR' and Rut eq '" + rut + "'";
                    oModel.read(sPath, {
                        //urlParameters: oFilters, // TODO: cambiar filtros 
                        success: function (oData, response) {
                            var oForm = that.getView().byId("form1");
                            var oButton1 = that.getView().byId("button1");
                            var oTable = that.getView().byId("table1");
                            var oButton2 = that.getView().byId("cargaarchivospaeh");
                            if (oData.results[0].Url !== ""){
                                that.oSuccessMessageDialog = new sap.m.Dialog({
                                    type: sap.m.DialogType.Message,
                                    title: "Avisos",
                                    state: sap.ui.core.ValueState.Success,
                                    content: [
                                        new sap.m.Image({
                                            src: "/images/udp-logo.jpg", ///home/user/projects/liquidacion_sueldos_v1.2/webapp/images/udp-logo.jpg
                                            height : "100px"
                                        }),
                                        new sap.m.Text({ text: "Haga Click en este \u00a0" }),
                                        new sap.m.Link({
                                            text: "Link",
                                            emphasized: true,
                                            value: oData.results[0].Url,
                                            press: function () {
                                                var url = oData.results[0].Url;
                                                window.open('https://' + url, '_blank').focus();
                                            }
                                        }),
                                        new sap.m.Text({ text: "\u00a0" })
                                    ],
                                    afterClose: function () {
                                        oSuccessMessageDialog.destroy();
                                    }
                                });
                                that.oSuccessMessageDialog.open();
                                oForm.setVisible(false);
                                oButton1.setVisible(false);
                                oTable.setVisible(false);
                                oButton2.setVisible(false);
                            }else{
                                oForm.setVisible(true);
                                oButton1.setVisible(true);
                                oTable.setVisible(true);
                                oButton2.setVisible(true);
                            };
                        },
                        error: function (oError){
                            sap.m.MessageToast.show("Error al leer Avisos");
                        }
                    });
            },

            obtenerPDF: function () {
                

                 var Pernr  = "999"; //Variable para el Pernr del usuario, una vez obtenido  
                 var MesIni = this.getView().byId("ComboMesLiquidacionInicial").getSelectedKey();;
                 var AnoIni = this.getView().byId("ComboAnoLiquidacionInicial").getValue();
                 var MesFin = this.getView().byId("ComboMesLiquidacionFinal").getSelectedKey();
                 var AnoFin = this.getView().byId("ComboAnoLiquidacionFinal").getValue();

                 var opdfViewer = new PDFViewer();
                 this.getView().addDependent(opdfViewer);
                 var serviceUrl = this.getOwnerComponent().getManifestObject()._oBaseUri._parts.path;
                 var sServiceURL = serviceUrl + "sap/opu/odata/sap/ZGW_PAL_COLAB_SRV";
                 var sSource = sServiceURL + 
                 "/LiqObtenerSet(Pernr='" + Pernr + "',MesIni=" + MesIni + ",AnoIni=" + AnoIni + ",MesFin=" + MesFin + ",AnoFin=" + AnoFin + ")/$value";
                 opdfViewer.setSource(sSource);
                 opdfViewer.setTitle( "Liquidacion de Sueldo");
                 opdfViewer.open(); 
                 

                

            }
        });
    });