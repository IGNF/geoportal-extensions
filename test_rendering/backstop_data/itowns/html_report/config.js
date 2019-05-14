report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_MousePosition__default_0_dividGPmousePosition-_0_phone.png",
        "test": "../bitmaps_test/20181108-182136/itowns_backstop_MousePosition__default_0_dividGPmousePosition-_0_phone.png",
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
        "test": "../bitmaps_test/20181108-182136/itowns_backstop_MousePosition__default_0_dividGPmousePosition-_1_tablet.png",
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
        "test": "../bitmaps_test/20181108-182136/itowns_backstop_MousePosition__show_settings_0_document_0_phone.png",
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
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_MousePosition__show_settings_0_document_1_tablet.png",
        "test": "../bitmaps_test/20181108-182136/itowns_backstop_MousePosition__show_settings_0_document_1_tablet.png",
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
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../../..",
        "test": "../../..",
        "selector": "",
        "fileName": "",
        "label": "",
        "scenario": {
          "label": "LayerSwitcher : default",
          "cookiePath": "backstop_data/itowns/engine_scripts/cookies.json",
          "url": "http://localhost:8087/test_rendering/itowns/layerswitcher.html",
          "delay": 1000,
          "clickSelector": "label[id^=GPshowLayersListPicto]",
          "misMatchThreshold": 10,
          "postInteractionWait": 1000,
          "selectors": [
            "div[id^=GPlayerSwitcher-]"
          ],
          "sIndex": 2
        },
        "viewport": {
          "label": "phone",
          "width": 320,
          "height": 480,
          "vIndex": 0
        },
        "msg": "Chromy error",
        "error": "Chromy error: WaitTimeoutError. See scenario – LayerSwitcher : default (phone)"
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
          "label": "LayerSwitcher : default",
          "cookiePath": "backstop_data/itowns/engine_scripts/cookies.json",
          "url": "http://localhost:8087/test_rendering/itowns/layerswitcher.html",
          "delay": 1000,
          "clickSelector": "label[id^=GPshowLayersListPicto]",
          "misMatchThreshold": 10,
          "postInteractionWait": 1000,
          "selectors": [
            "div[id^=GPlayerSwitcher-]"
          ],
          "sIndex": 2
        },
        "viewport": {
          "label": "tablet",
          "width": 1024,
          "height": 768,
          "vIndex": 1
        },
        "msg": "Chromy error",
        "error": "Chromy error: WaitTimeoutError. See scenario – LayerSwitcher : default (tablet)"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_LayerSwitcher_interaction__add_a_layer_0_document_0_phone.png",
        "test": "../bitmaps_test/20181108-182136/itowns_backstop_LayerSwitcher_interaction__add_a_layer_0_document_0_phone.png",
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
          "misMatchPercentage": "0.00",
          "analysisTime": 28
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_LayerSwitcher_interaction__add_a_layer_0_document_1_tablet.png",
        "test": "../bitmaps_test/20181108-182136/itowns_backstop_LayerSwitcher_interaction__add_a_layer_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "itowns_backstop_LayerSwitcher_interaction__add_a_layer_0_document_1_tablet.png",
        "label": "LayerSwitcher (interaction) : add a layer",
        "misMatchThreshold": 30,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "14.19",
          "analysisTime": 38
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_0_phone.png",
        "test": "../bitmaps_test/20181108-182136/itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_0_phone.png",
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
          "misMatchPercentage": "0.01",
          "analysisTime": 45
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_1_tablet.png",
        "test": "../bitmaps_test/20181108-182136/itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_1_tablet.png",
        "label": "LayerSwitcher (interaction) : remove a layer",
        "misMatchThreshold": 30,
        "error": "Reference file not found /var/www/api-v3-plugins-git/geoportal-extensions/test_rendering/backstop_data/itowns/bitmaps_reference/itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_1_tablet.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_MNT_0_document_0_phone.png",
        "test": "../bitmaps_test/20181108-182136/itowns_backstop_MNT_0_document_0_phone.png",
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
          "misMatchPercentage": "0.02",
          "analysisTime": 35
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_MNT_0_document_1_tablet.png",
        "test": "../bitmaps_test/20181108-182136/itowns_backstop_MNT_0_document_1_tablet.png",
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
          "analysisTime": 33
        }
      },
      "status": "pass"
    }
  ]
});