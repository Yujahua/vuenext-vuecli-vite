<template>
  <div class="ui-example-child ui-example-child-bill-0">
    <ui-bill
      title="借款电子票据"
      no="12345689"
      water-mark="CSII-VX-MOBILE"
    >
      <ui-detail-item title="借款金额">
        &yen;30,000
      </ui-detail-item>
      <ui-detail-item title="收款账户">
        <ui-icon name="bank-zs" svg style="margin-right:10px;"></ui-icon>招商银行(尾号xxxx)
      </ui-detail-item>
      <ui-detail-item title="借款期数" content="12期" />
      <ui-detail-item title="正常还款总息">
        &yen;140.50
      </ui-detail-item>
      <ui-detail-item title="还款">
        <ui-tag
          size="small"
          shape="fillet"
          type="fill"
          fill-color="#858B9C"
          style="margin-right:4px;"
        >首次</ui-tag>
        &yen;404.50&nbsp;(9月22日)
      </ui-detail-item>
    </ui-bill>
	</div>
</template>

<script>import '@examples/assets/images/bank-zs.svg'
import {Bill, DetailItem, Icon, Tag} from '@csii/vx-mobile'

export default {
  name: 'bill-demo',
  components: {
    [Bill.name]: Bill,
    [DetailItem.name]: DetailItem,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
  },
}
</script>
