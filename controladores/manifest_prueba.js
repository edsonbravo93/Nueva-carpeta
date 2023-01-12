{
    "_version": "1.48.0",
    "sap.app": {
      "id": "ns.liquidacionsueldosv1.2",
      "type": "application",
      "i18n": "i18n/i18n.properties",
      "applicationVersion": {
        "version": "0.0.1"
      },
      "title": "{{appTitle}}",
      "description": "{{appDescription}}",
      "resources": "resources.json",
      "sourceTemplate": {
        "id": "@sap/generator-fiori:basic",
        "version": "1.8.3",
        "toolsId": "14d8f135-903a-4560-9595-fea3702a900a"
      },
      "dataSources": {
        "mainService": {
          "uri": "/sap/opu/odata/sap/ZGW_PAL_COLAB_SRV/",
          "type": "OData",
          "settings": {
            "annotations": [],
            "localUri": "localService/metadata.xml",
            "odataVersion": "2.0"
          }
        },
        "CrossService ": {
          "uri": "/sap/opu/odata/sap/ZGW_PAL_CROSS_SRV/",
          "type": "OData",
          "settings": {
            "annotations": [],
            "localUri": "localService/metadata.xml",
            "odataVersion": "2.0",
            "defaultBindingMode": "TwoWay",
            "defaultUpdateMethod": "sap.ui.model.odata.UpdateMethod.Put",
            "disableHeadRequestForToken": true,
            "useBatch": false,
            "json": true
          }
        }
      }
    },
    "sap.ui": {
      "technology": "UI5",
      "icons": {
        "icon": "",
        "favIcon": "",
        "phone": "",
        "phone@2": "",
        "tablet": "",
        "tablet@2": ""
      },
      "deviceTypes": {
        "desktop": true,
        "tablet": true,
        "phone": true
      }
    },
    "sap.ui5": {
      "flexEnabled": true,
      "dependencies": {
        "minUI5Version": "1.109.3",
        "libs": {
          "sap.m": {},
          "sap.ui.core": {},
          "sap.f": {},
          "sap.suite.ui.generic.template": {},
          "sap.ui.comp": {},
          "sap.ui.generic.app": {},
          "sap.ui.table": {},
          "sap.ushell": {}
        }
      },
      "contentDensities": {
        "compact": true,
        "cozy": true
      },
      "models": {
        "i18n": {
          "type": "sap.ui.model.resource.ResourceModel",
          "settings": {
            "bundleName": "ns.liquidacionsueldosv1.2.i18n.i18n"
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
        },
        "CrossModel": {
          "dataSource": "CrossService ",
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
      "resources": {
        "css": [
          {
            "uri": "css/style.css"
          }
        ]
      },
      "routing": {
        "config": {
          "routerClass": "sap.m.routing.Router",
          "viewType": "XML",
          "async": true,
          "viewPath": "ns.liquidacionsueldosv1.2.view",
          "controlAggregation": "pages",
          "controlId": "app",
          "clearControlAggregation": false
        },
        "routes": [
          {
            "name": "RouteliquidacionSueldos",
            "pattern": ":?query:",
            "target": [
              "TargetliquidacionSueldos"
            ]
          }
        ],
        "targets": {
          "TargetliquidacionSueldos": {
            "viewType": "XML",
            "transition": "slide",
            "clearControlAggregation": false,
            "viewId": "liquidacionSueldos",
            "viewName": "liquidacionSueldos"
          }
        }
      },
      "rootView": {
        "viewName": "ns.liquidacionsueldosv1.2.view.App",
        "type": "XML",
        "async": true,
        "id": "App"
      }
    }
  }