<template>
  <div id="delProductModal"
  ref="delModal"
  class="modal fade" tabindex="-1"
  aria-labelledby="delProductModalLabel"
  aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span>刪除產品</span>
            </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{tempProduct.title}}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="productDel(tempProduct)">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {

  data() {
    return {
      delModal: '',
    };
  },
  props: ['tempProduct'],
  mounted() {
    this.delModal = new Modal(this.$refs.delModal, {
      keyboard: false,
      backdrop: 'static',
    });
  },
  methods: {
    openDelModal() {
      this.delModal.show();
    },
    closeDelModal() {
      this.delModal.hide();
    },
    productDel(tempProduct) {
      console.log(tempProduct.id);
      // const { id } = tempProduct.id;
      console.log(tempProduct, tempProduct.id);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${tempProduct.id}`;
      this.$http.delete(url)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          this.$emit('emit-update');
          this.delModal.hide();
        });
    },

  },

};
</script>
