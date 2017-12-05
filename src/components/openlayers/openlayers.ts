import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';

import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';
import { WidgetBase, guidGenerator } from '@csnext/cs-client'
import { Widget } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';

@Component({
    name: 'Map',
    template: '<div :id="\'map-\' + widget.id" class="map"></div>'
})
export class OpenLayers extends WidgetBase {

    public map: Map;
    public attribution: any;

    public mounted() {
        console.log(this.widget);
        this.attribution = new ol.control.Attribution({
            collapsible: false
        });
        Vue.nextTick(() => {
            if (!this.widget) { this.widget = { id: guidGenerator() } };
            this.map = new ol.Map({
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                controls: [],
                target: 'map-' + this.widget.id,
                view: new ol.View({
                    center: [6.5746103, 53.1914252],
                    zoom: 3,
                    projection: 'EPSG:3857'
                })
            });
            window.addEventListener('resize', this.checkSize);
        })

    }

    public checkSize() {
        const small = this.map.getSize()[0] < 600;
        this.attribution.setCollapsible(small);
        this.attribution.setCollapsed(small);
    }


}