import { GeojsonParser } from './datasource/geojson-parser';
import { JsonResolver } from './datasource/json-resolver';
import { DatasourceManager } from './services/datasource-manager';
import { IDatasource } from './datasource/datasource';
import { ILayerDatasource } from './datasource/layer-datasource';
import { IHierarchicalLayerDatasource } from './datasource/hierarchical-layer-datasource';
import { OpenLayers } from './components/openlayers/openlayers';
import Vue from 'vue';
import { Prop, Watch, Provide } from 'vue-property-decorator';
import { AppState, csapp } from '@csnext/cs-client';
import Vuetify from "vuetify";
import "../node_modules/vuetify/dist/vuetify.css";
import { LayerControl } from './components/layer-control/layer-control';

import './assets/style.css';
import map from 'ol/map';

new Vue({
  el: '#app',
  render: (h: any) => h(csapp)
});

var layers: IDatasource[] = [];
var overlays: IHierarchicalLayerDatasource[];

// @Provide() var ldm: DatasourceManager;
const appState = AppState.Instance;

const project = {
  title: "popsim-gui",
  navigation: {
    style: "tabs"
  },
  datasources: {
    'test': {
      id: 'test',
      source: 'http://169.254.80.80:8080/ziekenhuis.json',
      handlers: [{
        processorId: 'webrequest'
      }]
    }
  },
  leftSidebar: {
    open: true,
    clipped: true,
    persistent: true,
    mini: false,
    temporary: false,
    component: LayerControl
  },
  theme: {
    dark: false,
    colors: {
      primary: 'white',
      secondary: '#e5e9ea',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107'
    }
  },
  dashboards: [
    {
      path: "/",
      icon: "map",
      manager: "single",
      title: "Map",
      widgets: [{ component: OpenLayers }]
    }
  ]
};
appState.Init(project);
(<any>window).app = appState;
appState.projectManager.datasourceManager.load('test').then((result: Object) => {
  debugger;-

  console.log('Test:');
  console.log(result);
});


// function initLayerControl() {
//   overlays = [
//     {
//       id: 'level1',
//       dataType: 'hierarchy',
//       title: 'Layer 1',
//       description: 'My first test layer',
//       isBaseLayer: false,
//       isCollapsed: false,
//       singleSelect: false,
//       isVisible: false,
//       opacity: 1,
//       data: [
//         {
//           id: 'level1.1',
//           dataType: 'hierarchy',
//           title: 'Sub-layer 1.1',
//           description: 'My first sub-layer',
//           isBaseLayer: false,
//           isCollapsed: false,
//           singleSelect: false,
//           isVisible: false,
//           opacity: 1,
//           data: [
//             {
//               id: '1.1.test',
//               title: 'My visible home',
//               source: 'http://192.168.178.42:8888/test.geojson',
//               sourceType: 'json',
//               dataType: 'geojson',
//               isVisible: true
//             },
//             {
//               id: '1.1.bz_ziekenhuis',
//               title: 'Ziekenhuizen',
//               source: 'http://192.168.178.42:8888/bz/ziekenhuis.geojson',
//               sourceType: 'json',
//               dataType: 'geojson',
//               styleId: 'rt_ziekenhuis'
//             }
//           ]
//         }
//       ]
//     }, {
//       id: 'level2',
//       dataType: 'hierarchy',
//       title: 'Layer 2',
//       description: 'My second test layer',
//       isBaseLayer: false,
//       isCollapsed: false,
//       singleSelect: false,
//       isVisible: false,
//       opacity: 1,
//       data: [
//         {
//           id: 'level2.1',
//           dataType: 'hierarchy',
//           title: 'Sub-layer 2.1',
//           description: 'My second sub-layer',
//           isBaseLayer: false,
//           isCollapsed: false,
//           singleSelect: false,
//           isVisible: false,
//           opacity: 1,
//           data: [
//             {
//               id: '2.1.test',
//               title: 'Test 2',
//               source: 'http://192.168.178.42:8888/test.geojson',
//               sourceType: 'json',
//               dataType: 'geojson'
//             },
//             {
//               id: '2.2.bz_ziekenhuis',
//               title: 'Ziekenhuizen 2',
//               source: 'http://192.168.178.42:8888/bz/ziekenhuis.geojson',
//               sourceType: 'json',
//               dataType: 'geojson',
//               styleId: 'rt_ziekenhuis'
//             }
//           ]
//         }
//       ]
//     }
//   ];
// }

// function loadData() {
//   ldm = new DatasourceManager();
//   ldm.addResolver(new JsonResolver());
//   ldm.addParser(new GeojsonParser());
//   ldm.addDatasource({
//     id: 'cartodb',
//     title: 'CartoDB',
//     isVisible: true,
//     source: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
//     dataType: 'tile',
//     options: {
//       attribution: 'Go to CartoDB to find out more.'
//     }
//   } as ILayerDatasource);
//   ldm.addDatasource({
//     id: 'test',
//     source: 'http://192.168.178.42:8888/test.geojson',
//     sourceType: 'json',
//     dataType: 'geojson'
//   } as IDatasource);
//   ldm.addDatasource({
//     id: 'bz_ziekenhuis',
//     source: 'http://192.168.178.42:8888/bz/ziekenhuis.geojson',
//     sourceType: 'json',
//     dataType: 'geojson',
//     options: {
//       resourceTypeId: 'rt_ziekenhuis'
//     }
//   } as IDatasource);
//   ldm.addDatasource({
//     id: 'rt_ziekenhuis',
//     source: 'http://192.168.178.42:8888/resourcetypes/ziekenhuis.json',
//     sourceType: 'json',
//     dataType: 'geojson'
//   } as IDatasource);

//   ldm.loadData('cartodb').then((datasource: IDatasource) => {
//     layers.push(datasource);
//   });
//   // const dummy = () => console.warn('I\'ve been called')
//   // await this.ldm
//   //   .loadData('rt_ziekenhuis');
//   // .then((datasource: IDatasource) => {
//   //   // this.layers.push(datasource);
//   // });
//   await ldm.loadData('bz_ziekenhuis').then((datasource: IDatasource) => {
//     layers.push(datasource);
//   });
// }