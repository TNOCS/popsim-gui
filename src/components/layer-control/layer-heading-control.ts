import { ILayerDatasource } from './../../datasource/layer-datasource';
import { IHierarchicalLayerDatasource } from './../../datasource/hierarchical-layer-datasource';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';
import { uuid4 } from '../../helpers/utils';
import './layer-control.css';

@Component({
  template: require('./layer-heading-control.html'),
  name: 'layer-heading-control',
})
export class LayerHeadingControl extends Vue {
  @Prop({ type: Object })
  public heading: IHierarchicalLayerDatasource;

  public id = uuid4();

  public isCollapsed: boolean = this.heading.isCollapsed || false;

  public isSelected: boolean = this.heading.isVisible || false;

  public mounted() {
    if (this.isSelected) { this.itemSelected(); }
  }

  public toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  public get isFolder() { return this.heading.data instanceof Array; }

  public itemSelected() {
    this.$emit(this.isSelected ? 'select:item' : 'unselect:item', this.heading);
  }

  public selectItem(item: ILayerDatasource) {
    this.$emit('select:item', item);
  }

  public unselectItem(item: ILayerDatasource) {
    this.$emit('unselect:item', item);
  }

}
