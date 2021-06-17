<template>
      <div class="container">
<div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
      建立新的產品
      </button>
</div>
<table class="table mt-4">
      <thead>
      <tr>
      <th width="120">
            分類
      </th>
      <th>產品名稱</th>
      <th width="120">
            原價
      </th>
      <th width="120">
            售價
      </th>
      <th width="100">
            是否啟用
      </th>
      <th width="120">
            編輯
      </th>
      </tr>
      </thead>
      <tbody>
      <tr  v-for="(product,) in products " :key="product">
      <td>{{product.category}}</td>
      <td>{{product.title}}</td>
      <td class="text-end">{{product.origin_price}}</td>
      <td class="text-end">{{product.price}}</td>
      <td>
            <span class="text-success" v-if="product.is_enabled ==1">啟用</span>
            <span v-else>未啟用</span>
      </td>
      <td>
            <div class="btn-group">
            <button type="button" class="btn btn-outline-primary btn-sm"
            @click="openModal('edit', product)">
            編輯
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm"
            @click="openModal('del',product)">
            刪除
            </button>
            </div>
      </td>
      </tr>
      </tbody>
</table>
</div>
<add-modal ref="addModal" :temp-products="tempProduct" :is-new="isNew"
@update="getData"></add-modal>
<del-modal ref="delModal" :temp-product="tempProduct" @emit-update="getData"> </del-modal>
<pagination :page="pagination" @emit-page="getData"></pagination>
</template>

<script>
import pagination from '@/components/Pagination.vue';
import delModal from '@/components/DelModal.vue';
import addModal from '@/components/AddModal.vue';

export default {
  data() {
    return {
      products: [], // 渲染
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
    };
  },
  components: { pagination, delModal, addModal },
  methods: {
    getData(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          console.log(res);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        });
    },
    openModal(state, product) {
      if (state === 'new') {
        this.isNew = true;
        this.$refs.addModal.openModal();
      } else if (state === 'edit') {
        console.log(product);
        this.tempProduct = { ...product };
        this.$refs.addModal.openModal();
        this.isNew = false;
      } else if (state === 'del') {
        this.$refs.delModal.openDelModal();
        this.tempProduct = { ...product };
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
