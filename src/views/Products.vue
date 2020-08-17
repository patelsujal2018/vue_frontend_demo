<template>
  <div class="home">
    <div class="container">
      <h2 class="float-left">Products Table</h2>
      <p class="float-right"><b-button variant="success" @click="addProduct()">Add New Product</b-button></p>
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Product name</th>
            <th>Product description</th>
            <th>Category name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Status</th>
            <th colspan="2">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product,index) in productlist" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.product_category.name }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.status }}</td>
            <td><b-button variant="success" @click="editProduct(product.id)">Edit</b-button></td>
            <td><b-button variant="danger" @click="deleteProduct(product.id)">Delete</b-button></td>
          </tr>
        </tbody>
      </table>
    </div>



    <b-modal ref="add-product-modal" hide-footer title="Add New Product">
      <form method="post" @submit.prevent="addProductSubmit">
        <div class="form-group">
          <label class="d-block">Product Name</label>
          <div>
            <input type="text" class="form-control" name="product_name" v-model="newproduct.name" />
          </div>
        </div>
        <div class="form-group">
          <label class="d-block">Product Description</label>
          <div>
            <textarea class="form-control" name="product_description" rows="1" v-model="newproduct.description"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label>Product Category</label>
          <select class="form-control" v-model="newproduct.category_id">
            <option v-for="category in categorylist" :key="category.id" v-bind:value="category.id" v-text="category.name"></option>
          </select>
        </div>
        <div class="form-group">
          <label class="d-block">Product Stock</label>
          <div>
            <input type="text" class="form-control" name="product_stock" v-model="newproduct.stock" />
          </div>
        </div>
        <div class="form-group">
          <label class="d-block">Product Price</label>
          <div>
            <input type="text" class="form-control" name="product_price" v-model="newproduct.price" />
          </div>
        </div>
        <div class="form-group">
          <div>
            <input type="submit" class="form-control btn btn-primary" name="edit_product" value="Submit" />
          </div>
        </div>
      </form>
    </b-modal>



    <b-modal ref="edit-product-modal" hide-footer title="Edit Product">
      <form method="post" @submit.prevent="editProductSubmit">
        <div class="form-group">
          <label class="d-block">Product Name</label>
          <div>
            <input type="text" class="form-control" name="product_name" v-model="editproduct.name" />
          </div>
        </div>
        <div class="form-group">
          <label class="d-block">Product Description</label>
          <div>
            <textarea class="form-control" name="product_description" rows="1" v-model="editproduct.description"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label>Product Category</label>
          <select class="form-control" v-model="editproduct.category_id">
            <option v-for="category in categorylist" :key="category.id" v-bind:value="category.id" v-text="category.name"></option>
          </select>
        </div>
        <div class="form-group">
          <label class="d-block">Product Stock</label>
          <div>
            <input type="text" class="form-control" name="product_stock" v-model="editproduct.stock" />
          </div>
        </div>
        <div class="form-group">
          <label class="d-block">Product Price</label>
          <div>
            <input type="text" class="form-control" name="product_price" v-model="editproduct.price" />
          </div>
        </div>
        <div class="form-group">
          <div>
            <input type="submit" class="form-control btn btn-primary" name="edit_product" value="Submit" />
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newproduct: {},
      editproduct: {}
    };
  },
  name: "Products",
  components: {},
  mounted() {
    this.getProductList();
  },
  computed: {
    productlist() {
      return this.$store.getters["products/getproductlist"];
    },
    categorylist() {
      return this.$store.getters["product_category/getcategorylist"];
    },
  },
  methods: {
    getProductList() {
      this.$store.dispatch("products/get_product_list").then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
    addProduct() {
      this.$store.dispatch("product_category/get_product_category_list").then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
      this.$refs['add-product-modal'].show()
    },
    addProductSubmit(){
      this.$store.dispatch("products/create_product", this.newproduct).then((response) => {
        if(response.data.success == true){
          this.$refs['add-product-modal'].hide();
          this.getProductList();
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    editProduct(product_id) {
      this.$store.dispatch("products/get_product", product_id).then((response) => {
        this.editproduct = response.data.data.product;
      }).catch((error) => {
        console.log(error);
      });
      this.$store.dispatch("product_category/get_product_category_list").then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
      this.$refs['edit-product-modal'].show()
    },
    editProductSubmit() {
      this.$store.dispatch("products/update_product", this.editproduct).then((response) => {
        if(response.data.success == true){
          this.$refs['edit-product-modal'].hide();
          this.getProductList();
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    deleteProduct(product_id) {
      this.$store.dispatch("products/delete_product", product_id).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>
