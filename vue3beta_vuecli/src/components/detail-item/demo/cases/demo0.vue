<template>
  <div class="ui-example-child ui-example-child-detail-item ui-example-child-detail-item-0">
    <ui-field>
      <ui-detail-item title="承保公司" content="众安" bold />
      <ui-detail-item title="投保人" content="张三" />
      <ui-detail-item title="被保人" content="李四" />
      <ui-detail-item title="保险费用" content="0.1元/日" />
      <ui-detail-item title="保障日期" content="2018/08/08 ~ 2019/08/08" />
      <ui-detail-item title="保单号" content="123456789" />
      <ui-detail-item title="保单协议">
        <a href="#" style="color:#5878B4;text-decoration:none;">查看</a>
      </ui-detail-item>
    </ui-field>
  </div>
</template>

<script>import {Field, DetailItem} from '@csii/vx-mobile'

export default {
  name: 'detail-item-demo',

  components: {
    [Field.name]: Field,
    [DetailItem.name]: DetailItem,
  },
}
</script>
