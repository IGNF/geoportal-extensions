report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_MousePosition__default_0_dividGPmousePosition-_0_desktop.png",
        "test": "../bitmaps_test/20190408-172835/itowns_backstop_MousePosition__default_0_dividGPmousePosition-_0_desktop.png",
        "selector": "div[id^=GPmousePosition-]",
        "fileName": "itowns_backstop_MousePosition__default_0_dividGPmousePosition-_0_desktop.png",
        "label": "MousePosition : default",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "itowns/mouseposition.html",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "desktop",
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
        "reference": "../bitmaps_reference/itowns_backstop_MousePosition__show_settings_0_document_0_desktop.png",
        "test": "../bitmaps_test/20190408-172835/itowns_backstop_MousePosition__show_settings_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "itowns_backstop_MousePosition__show_settings_0_document_0_desktop.png",
        "label": "MousePosition : show settings",
        "misMatchThreshold": 0.1,
        "url": "itowns/mouseposition-1.html",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00",
          "analysisTime": 36
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_LayerSwitcher__default_0_dividGPlayerSwitcher-_0_desktop.png",
        "test": "../bitmaps_test/20190408-172835/itowns_backstop_LayerSwitcher__default_0_dividGPlayerSwitcher-_0_desktop.png",
        "selector": "div[id^=GPlayerSwitcher-]",
        "fileName": "itowns_backstop_LayerSwitcher__default_0_dividGPlayerSwitcher-_0_desktop.png",
        "label": "LayerSwitcher : default",
        "misMatchThreshold": 10,
        "url": "https://localhost:8087/test_rendering/itowns/layerswitcher.html",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "9.39",
          "analysisTime": 18
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_LayerSwitcher_interaction__add_a_layer_0_document_0_desktop.png",
        "test": "../bitmaps_test/20190408-172835/itowns_backstop_LayerSwitcher_interaction__add_a_layer_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "itowns_backstop_LayerSwitcher_interaction__add_a_layer_0_document_0_desktop.png",
        "label": "LayerSwitcher (interaction) : add a layer",
        "misMatchThreshold": 30,
        "url": "https://localhost:8087/test_rendering/itowns/interactions/layerswitcher.html",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "1.48",
          "analysisTime": 52
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_0_desktop.png",
        "test": "../bitmaps_test/20190408-172835/itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "itowns_backstop_LayerSwitcher_interaction__remove_a_layer_0_document_0_desktop.png",
        "label": "LayerSwitcher (interaction) : remove a layer",
        "misMatchThreshold": 30,
        "url": "https://localhost:8087/test_rendering/itowns/interactions/layerswitcher.html",
        "expect": 0,
        "viewportLabel": "desktop",
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
        "reference": "../bitmaps_reference/itowns_backstop_MNT_0_document_0_desktop.png",
        "test": "../bitmaps_test/20190408-172835/itowns_backstop_MNT_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "itowns_backstop_MNT_0_document_0_desktop.png",
        "label": "MNT",
        "misMatchThreshold": 30,
        "url": "https://localhost:8087/test_rendering/itowns/mnt.html",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.02",
          "analysisTime": 55
        }
      },
      "status": "pass"
    }
  ],
  "id": "itowns_backstop"
});