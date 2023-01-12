



valida_encuesta: function(that) {
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
                                        src: "images/logo_udp.png",
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
            }

            // console.log(sap.ushell.Container.getService("UserInfo").getId() ); //Con esta linea, se obtiene el Uss que se esta logueando

            "models": {
                "i18n": {
                  "type": "sap.ui.model.resource.ResourceModel",
                  "settings": {
                    "bundleName": "com.udp.67.CargaNominaPaeh.i18n.i18n"
                  }
                },
                "": {
                  "dataSource": "mainService",
                  "preload": true,
                  "settings": {
                    "defaultBindingMode": "TwoWay",
                    "defaultCountMode": "Inline",
                    "refreshAfterChange": false,
                    "metadataUrlParams": {
                      "sap-value-list": "none",
                      "saml2": "disabled"
                    }
                  }
                }
              },