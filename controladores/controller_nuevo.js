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

        return Controller.extend("ns.liquidacionsueldosv1.2.controller.liquidacionSueldos", {

            onInit: function () {

                this.onOpenDialog();
                //this.validacionEncuestas(this);

                //Obtener los Años del Usuario

                var ussPernrAnos = "999"; //Variable para obtener el Pernr despues con otra funcion

                var anosActivo = "/sap/opu/odata/sap/ZGW_PAL_COLAB_SRV/UserDataSet('" + ussPernrAnos + "')/toAnos";
                var anoActivoJson = new sap.ui.model.json.JSONModel();
                this.getView().byId("ComboAnoLiquidacionInicial").setModel(anoActivoJson);
                this.getView().byId("ComboAnoLiquidacionFinal").setModel(anoActivoJson);
                anoActivoJson.loadData(anosActivo, null, false);
                anoActivoJson.getProperty("/d/results/");


                //Obtener Meses

                var mesesActivo = "/sap/opu/odata/sap/ZGW_PAL_COLAB_SRV/MesesSet";
                var mesesActivoJson = new sap.ui.model.json.JSONModel();
                this.getView().byId("ComboMesLiquidacionInicial").setModel(mesesActivoJson);
                this.getView().byId("ComboMesLiquidacionFinal").setModel(mesesActivoJson);
                mesesActivoJson.loadData(mesesActivo, null, false);
                mesesActivoJson.getProperty("/d/results/");


                this.tableCabUpdFin();


            },

            onBeforeRendering: function () {
            },

            onAfterRendering: function () {
            },

            onExit: function () {
            },

            validacionEncuestas: function (that) {
                var sPathAvisos = "/sap/opu/odata/sap/ZGW_PAL_CROSS_SRV/";
                var oModel = new sap.ui.model.odata.ODataModel(sPathAvisos, true);
                sap.ui.getCore().setModel(oModel, "avisosModel");
                this.getView().setModel(oModel, "avisosModel");
                var oSuccessMessageDialog = {};
                var test = "";
                var rut = "1-9";
                var sPath = "/AvisosSet?$filter=Test eq '" + test + "' and Rol eq 'COLABORADOR' and Rut eq '" + rut + "'";
                oModel.read(sPath, {
                    //urlParameters: oFilters, // TODO: cambiar filtros 
                    success: function (oData, response) {
                        var oForm = that.getView().byId("form1");
                        var oButton1 = that.getView().byId("button1");
                        var oTable = that.getView().byId("table1");
                        var oButton2 = that.getView().byId("cargaarchivospaeh");
                        if (oData.results[0].Url !== "") {
                            that.oSuccessMessageDialog = new sap.m.Dialog({
                                type: sap.m.DialogType.Message,
                                title: "Avisos",
                                state: sap.ui.core.ValueState.Success,
                                content: [
                                    new sap.m.Image({
                                        src: "/images/udp-logo.jpg", ///home/user/projects/liquidacion_sueldos_v1.2/webapp/images/udp-logo.jpg
                                        height: "100px"
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
                        } else {
                            oForm.setVisible(true);
                            oButton1.setVisible(true);
                            oTable.setVisible(true);
                            oButton2.setVisible(true);
                        };
                    },
                    error: function (oError) {
                        sap.m.MessageToast.show("Error al leer Avisos");
                    }
                });
            },

            tableCabUpdFin: function () {

                debugger
                var oModel = this.getView().getModel();
                sap.ui.getCore().setModel(oModel, "oModelPaecab");
                var oTable2 = this.byId("tableAvisos");
                var oFilters2 = [];
                var vTest = "X";
                var vPortal = "COLABORADOR";
                var vRut = "1-9";
                var filtro1 = new sap.ui.model.Filter("Test", sap.ui.model.FilterOperator.EQ, vTest);
                oFilters2.push(filtro1);
                var filtro2 = new sap.ui.model.Filter("Rol", sap.ui.model.FilterOperator.EQ, vPortal);
                oFilters2.push(filtro2);
                var filtro3 = new sap.ui.model.Filter("Rut", sap.ui.model.FilterOperator.EQ, vRut);
                oFilters2.push(filtro3);
                if (oTable2) {
                    oTable2.setModel(this.getView().getModel("CrossModel"));
                    oTable2.bindItems("/AvisosSet", oTable2, null, oFilters2);
                }
            },

            obtenerPDF: function () {


                var Pernr = "999"; //Variable para el Pernr del usuario, una vez obtenido  
                var MesIni = this.getView().byId("ComboMesLiquidacionInicial").getSelectedKey();;
                var AnoIni = this.getView().byId("ComboAnoLiquidacionInicial").getValue();
                var MesFin = this.getView().byId("ComboMesLiquidacionFinal").getSelectedKey();
                var AnoFin = this.getView().byId("ComboAnoLiquidacionFinal").getValue();

                var opdfViewer = new PDFViewer();
                this.getView().addDependent(opdfViewer);
                var sServiceURL = "/sap/opu/odata/sap/ZGW_PAL_COLAB_SRV";
                var sSource = sServiceURL +
                    "/LiqObtenerSet(Pernr='" + Pernr + "',MesIni=" + MesIni + ",AnoIni=" + AnoIni + ",MesFin=" + MesFin + ",AnoFin=" + AnoFin + ")/$value";
                opdfViewer.setSource(sSource);
                opdfViewer.setTitle("Liquidacion de Sueldo");
                opdfViewer.open();




            },

            onOpenDialog: function () {
                var that = this;
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "ns.liquidacionsueldosv1.2.view.ValidaAvisos"
                    });
                }

                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                    that.tableCabUpdFin();
                });

            },

            tableAvisosUpdFin: function (oEvent) {
                if (this.byId("tableAvisos").getBinding("items").isLengthFinal()) {
                    if (this.getView().byId("tableAvisos").getItems()[0].mAggregations.cells[1].mProperties.href == "https://") {
                        this.pDialog.then(function (oDialog) {
                            oDialog.close();
                        });
                    }
                }
            }

        }); 
    });