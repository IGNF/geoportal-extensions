report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_MousePosition__default_0_dividGPmousePosition-_0_phone.png",
        "test": "../bitmaps_test/20180606-143818/itowns_backstop_MousePosition__default_0_dividGPmousePosition-_0_phone.png",
        "selector": "div[id^=GPmousePosition-]",
        "fileName": "itowns_backstop_MousePosition__default_0_dividGPmousePosition-_0_phone.png",
        "label": "MousePosition : default",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_MousePosition__default_0_dividGPmousePosition-_1_tablet.png",
        "test": "../bitmaps_test/20180606-143818/itowns_backstop_MousePosition__default_0_dividGPmousePosition-_1_tablet.png",
        "selector": "div[id^=GPmousePosition-]",
        "fileName": "itowns_backstop_MousePosition__default_0_dividGPmousePosition-_1_tablet.png",
        "label": "MousePosition : default",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_MousePosition__show_settings_0_document_0_phone.png",
        "test": "../bitmaps_test/20180606-143818/itowns_backstop_MousePosition__show_settings_0_document_0_phone.png",
        "selector": "document",
        "fileName": "itowns_backstop_MousePosition__show_settings_0_document_0_phone.png",
        "label": "MousePosition : show settings",
        "misMatchThreshold": 0.1,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00",
          "analysisTime": 49
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_MousePosition__show_settings_0_document_1_tablet.png",
        "test": "../bitmaps_test/20180606-143818/itowns_backstop_MousePosition__show_settings_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "itowns_backstop_MousePosition__show_settings_0_document_1_tablet.png",
        "label": "MousePosition : show settings",
        "misMatchThreshold": 0.1,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00",
          "analysisTime": 52
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_LayerSwitcher__default_0_dividGPlayerSwitcher-_0_phone.png",
        "test": "../bitmaps_test/20180606-143818/itowns_backstop_LayerSwitcher__default_0_dividGPlayerSwitcher-_0_phone.png",
        "selector": "div[id^=GPlayerSwitcher-]",
        "fileName": "itowns_backstop_LayerSwitcher__default_0_dividGPlayerSwitcher-_0_phone.png",
        "label": "LayerSwitcher : default",
        "misMatchThreshold": 10,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_LayerSwitcher__default_0_dividGPlayerSwitcher-_1_tablet.png",
        "test": "../bitmaps_test/20180606-143818/itowns_backstop_LayerSwitcher__default_0_dividGPlayerSwitcher-_1_tablet.png",
        "selector": "div[id^=GPlayerSwitcher-]",
        "fileName": "itowns_backstop_LayerSwitcher__default_0_dividGPlayerSwitcher-_1_tablet.png",
        "label": "LayerSwitcher : default",
        "misMatchThreshold": 10,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00",
          "analysisTime": 16
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_LayerSwitcher_interaction__add_a_layer_0_document_0_phone.png",
        "test": "../bitmaps_test/20180606-143818/itowns_backstop_LayerSwitcher_interaction__add_a_layer_0_document_0_phone.png",
        "selector": "document",
        "fileName": "itowns_backstop_LayerSwitcher_interaction__add_a_layer_0_document_0_phone.png",
        "label": "LayerSwitcher (interaction) : add a layer",
        "misMatchThreshold": 30,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "40.52",
          "analysisTime": 40
        },
        "diffImage": "../bitmaps_test/20180606-143818/failed_diff_itowns_backstop_LayerSwitcher_interaction__add_a_layer_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../../..",
        "test": "../../..",
        "selector": "",
        "fileName": "",
        "label": "",
        "scenario": {
          "label": "LayerSwitcher (interaction) : add a layer",
          "url": "http://localhost:8087/test_rendering/itowns/interactions/layerswitcher.html",
          "clickSelector": "#addLayer",
          "misMatchThreshold": 30,
          "delay": 10000,
          "postInteractionWait": 10000,
          "sIndex": 3,
          "selectors": [
            "document"
          ]
        },
        "viewport": {
          "label": "tablet",
          "width": 1024,
          "height": 768,
          "vIndex": 1
        },
        "msg": "Chromy error",
        "error": "Chromy error: Error. See scenario – LayerSwitcher (interaction) : add a layer (tablet)"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_0_phone.png",
        "test": "../bitmaps_test/20180606-143818/itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_0_phone.png",
        "selector": "document",
        "fileName": "itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_0_phone.png",
        "label": "LayerSwitcher (interaction) : remove a layer",
        "misMatchThreshold": 30,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00",
          "analysisTime": 34
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_1_tablet.png",
        "test": "../bitmaps_test/20180606-143818/itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_1_tablet.png",
        "label": "LayerSwitcher (interaction) : remove a layer",
        "misMatchThreshold": 30,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.04",
          "analysisTime": 38
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_MNT_0_document_0_phone.png",
        "test": "../bitmaps_test/20180606-143818/itowns_backstop_MNT_0_document_0_phone.png",
        "selector": "document",
        "fileName": "itowns_backstop_MNT_0_document_0_phone.png",
        "label": "MNT",
        "misMatchThreshold": 30,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.01",
          "analysisTime": 32
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_MNT_0_document_1_tablet.png",
        "test": "../bitmaps_test/20180606-143818/itowns_backstop_MNT_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "itowns_backstop_MNT_0_document_1_tablet.png",
        "label": "MNT",
        "misMatchThreshold": 30,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.01",
          "analysisTime": 31
        }
      },
      "status": "pass"
    }
  ]
});