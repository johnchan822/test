<template>
<div class="container">
      <Loading :active="isLoading"></Loading>
      <template v-if="carts.carts !=''">
          <div class="text-end">
            <button class="btn btn-outline-danger" type="button"
            @click="delAllCartData">清空購物車</button>
          </div>
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 150px">數量/單位</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <template  v-if="carts.carts">
                  <!-- 判斷 購物車內是否有資料 如果沒有不會顯示 -->
                <tr v-for="(cart ) in carts.carts" :key="cart">
                  <td >
                    <button type="button" class="btn btn-outline-danger btn-sm"
                    @click="delCartData(cart)"
                    :disabled="loadingStatus === cart.id">
                      <i class="fas fa-spinner fa-pulse " v-if="loadingStatus === cart.id"></i>
                      x
                    </button>
                  </td>
                  <td>
                      {{cart.product.title}}
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <div class="input-group mb-3">
                        <!-- 這邊注意修飾符+number 型別才會轉換 -->
                        <input min="1" type="number" class="form-control" v-model.number="cart.qty"
                        @change="updateCartData(cart)" :disabled="loadingStatus === cart.id">
                        <span class="input-group-text" id="basic-addon2"
                        v-if="loadingStatus === cart.id"></span>
                      </div>
                    </div>
                  </td>
                  <td class="text-end">
                      {{cart.final_total}}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{carts.total}}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{carts.final_total}}</td>
              </tr>
            </tfoot>
          </table>
        </template>
          <template v-else>
            <h5 class="d-flex justify-content-center m-5">
              麻煩回到產品頁面 "點選商品"
            </h5>
          </template>
  </div>
      <div class="my-5 row justify-content-center">
        <Form v-slot="{ errors }" @submit="onSubmit" class="col-md-6" ref='form'>
            <div class="mb-3">
                <label for="name">姓名</label>
                <Field id="name" name="姓名" type="text"
                class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入 姓名" rules="required" v-model="user.name"></Field>
              <error-message name="姓名" class="invalid-feedback"></error-message>
          </div>
          <div class="mb-3">
            <label for="email">信箱</label>
          <Field id="email" name="email" type="email" class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email" rules="email|required" v-model="user.email"></Field>
          <error-message name="email" class="invalid-feedback"></error-message>
          </div>
            <div class="mb-3">
              <label for="phone">收件人電話</label>
              <Field id="phone" name="電話" type="number" class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入 電話" rules="required|min:8" v-model="user.phone"></Field>
              <error-message name="電話" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="address">收件人地址</label>
              <Field id="address" name="地址" type="text" class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入 地址" rules="required" v-model="user.address"></Field>
              <error-message name="地址" class="invalid-feedback"></error-message>
            </div>
              <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea name="" id="message" class="form-control" cols="30" rows="10"
                  v-model="user.message"></textarea>
              </div>
            <button class="btn btn-danger" type="sumbit">送出表單</button>
        </Form>
      </div>
</template>

<script>
export default {
  data() {
    return {
      carts: {},
      user: {
        email: '',
        name: '',
        phone: '',
        adress: '',
        message: '',
      },
      isLoading: false,
    };
  },
  methods: {
    getCartData() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url)
        .then((res) => {
          console.log(res);
          this.carts = res.data.data;
          this.isLoading = false;
        });
    },
    // 刪除單筆資料
    delCartData(cart) {
      this.isLoading = true;
      this.loadingStatus = cart.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${cart.id}`;
      this.$http.delete(url)
        .then((res) => {
          console.log(res);
          this.getCartData();
          alert(res.data.message);
          this.isLoading = false;
        });
    },
    // 刪除全部資料
    delAllCartData() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(url)
        .then((res) => {
          console.log(res);
          this.getCartData();
          alert('已刪除所有購物車資料');
          this.isLoading = false;
        });
    },
    // 更新購物車數量內容
    updateCartData(cart) {
      this.isLoading = true;
      const carts = {
        product_id: cart.id,
        qty: cart.qty,
      };
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${cart.id}`;
      this.$http.put(url, { data: carts })
        .then((res) => {
          console.log(res);
          this.getCartData();
          this.isLoading = false;
        });
    },
    onSubmit() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http.post(url, {
        data: {
          user: {
            name: this.user.name,
            email: this.user.email,
            tel: this.user.phone,
            address: this.user.address,
          },
          message: this.user.message,
        },
      })
        .then((res) => {
          alert(res.data.message);
          this.getCartData();
          this.$refs.form.resetForm();
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getCartData();
  },
};

</script>
