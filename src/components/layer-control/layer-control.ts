import { ILayerDatasource } from '../../datasource/layer-datasource';
import { IHierarchicalLayerDatasource } from '../../datasource/hierarchical-layer-datasource';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';
import { LayerHeadingControl } from './layer-heading-control';
import './layer-control.css';

@Component({
  template: require('./layer-control.html'),
  name: 'layer-control',
  components: {
    'layer-heading-control': LayerHeadingControl
  }
})
export class LayerControl extends Vue {
  @Prop({ type: Array })
  public overlays: Array<ILayerDatasource | IHierarchicalLayerDatasource>;
  @Prop({ type: Array })
  public baseMaps: Array<ILayerDatasource | IHierarchicalLayerDatasource>;
  private selectedBaseMaps: ILayerDatasource[] = [];
  private selectedLayers: ILayerDatasource[] = [];

  created() {
    console.log(this.overlays);
    console.table(this.overlays);
  }

  // @Watch('overlays')
  // public overlaysChanged() {
  //   console.log(this.overlays);
  //   console.table(this.overlays);
  // }

  public selectLayer(layer: ILayerDatasource) {
    console.log(`Select item: ${layer.title}`);
    this.selectedLayers.push(layer);
    this.$emit('overlays:updated', this.selectedLayers);
  }

  public unselectLayer(layer: ILayerDatasource) {
    console.log(`Unselect item: ${layer.title}`);
    this.selectedLayers = this.selectedLayers.filter(l => l.id !== layer.id);
    this.$emit('overlays:updated', this.selectedLayers);
  }

  public selectBaseMap(basemap: ILayerDatasource) {
    console.log(`Select item: ${basemap.title}`);
    this.selectedBaseMaps.push(basemap);
    this.$emit('base-maps:updated', this.selectedBaseMaps);
  }

  public unselectBaseMap(basemap: ILayerDatasource) {
    console.log(`Unselect item: ${basemap.title}`);
    this.selectedBaseMaps = this.selectedBaseMaps.filter(l => l.id !== basemap.id);
    this.$emit('base-maps:updated', this.selectedBaseMaps);
  }

}
