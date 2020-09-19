<template>
  <div>
    <b-modal id="modal-no-backdrop" hide-backdrop content-class="shadow" title="Add Book">
      <p class="my-2">
        <template>
          <div class="form-group">
            <input v-model="Book.b_name" class="form-control form-control-sm" placeholder="Name..." />
          </div>
          <div class="form-group">
            <input
              v-model="Book.b_auther"
              class="form-control form-control-sm"
              placeholder="Auther"
            />
          </div>
          <div class="form-group">
            <input v-model="Book.publish_date" type="date" class="form-control form-control-sm" />
          </div>
        </template>
      </p>

      <template v-slot:modal-footer="{ hide }">
        <b-button size="sm" variant="success" @click="Addbook()">OK</b-button>
        <b-button size="sm" class="btn-warning" @click="insertManyBooks()">Add Multiple</b-button>
        <b-button size="sm" variant="danger" @click="hide()">Cancel</b-button>
      </template>
    </b-modal>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax class="page-header-image" style="background-image:url('img/header.jpg')"></parallax>
      <div class="container mt-5">
        <div class="content-center brand">
          <h1 class="h1-seo">Books.</h1>
          <h3>A beautiful Bootstrap 4 UI kit.</h3>
        </div>
      </div>
      <div class="container">
        <b-button
          class="pull-right"
          size="sm"
          variant="success"
          v-b-modal.modal-no-backdrop
        >Add Book</b-button>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Book Name</th>
              <th>Auther Name</th>
              <th>Publish Date</th>
              <th>Create By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in BookLists" :key="book._id">
              <td>{{index+1}}</td>
              <td>{{book.b_name}}</td>
              <td>{{book.b_auther}}</td>
              <td>{{book.publish_date | moment("DD/MM/YYYY")}}</td>
              <td>{{book.createdBy.name}}</td>
              <td>
                <i
                  v-b-modal.modal-no-backdrop
                  @click="onEditModal(book)"
                  class="now-ui-icons ui-2_settings-90 mr-2"
                ></i>
                <i @click="Deletebook(book._id)" class="now-ui-icons ui-1_simple-remove"></i>
              </td>
            </tr>
            <tr class="content-center" v-if="BookLists.length == 0">There is No Book in Data Base</tr>
          </tbody>
        </table>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import { Tooltip } from "element-ui";
import ComponentService from "./../service/ComponentService";
export default {
  [Tooltip.name]: Tooltip,
  name: "books",
  data() {
    return {
      Book: {
        b_name: "",
        b_auther: "",
        publish_date: "",
      },
      insertManyBook: [],
      BookLists: [],
    };
  },
  mounted() {
    this.Getbooks();
  },
  methods: {
    insertManyBooks() {
      //const values = this.Book;
      this.insertManyBook.push(this.Book);
      this.Book = {};
    },
    onEditModal(values) {
      this.Book = values;
      if (this.Book.publish_date) {
        this.Book.publish_date = ComponentService.format_date(
          this.Book.publish_date
        );
      }
    },
    Getbooks() {
      let loader = this.$loading.show({
        canCancel: false,
      });
      ComponentService.getBooks().then((res) => {
        loader.hide();
        if (res.success) {
        this.BookLists = res.BooksList;
        } else {
         this.Books = [];
        }
      });
    },
    Addbook() {
      let loader = this.$loading.show({
        canCancel: false,
      });
      if (!this.Book._id) {
        if (this.Book.b_name !== undefined) {
          this.insertManyBook.push(this.Book);
        }
        ComponentService.addBook(this.insertManyBook).then((res) => {
          loader.hide();
          if (res.success) {
            this.Getbooks();
            this.insertManyBook = [];
            this.Book = {};
             this.$toasted.global.my_messges({ message: res.message });
          } else {
             this.$toasted.global.my_messges({ message: res.message });
          }
        });
      } else {
       // this.insertManyBook.push(this.Book);
         ComponentService.updateBook(this.Book).then((res) => {
           loader.hide();
          if (res.success) {
            this.Getbooks();
            this.Book = {};
            this.insertManyBook = [];
            this.$toasted.global.my_messges({ message: res.message });
          } else {
             this.$toasted.global.my_messges({ message: res.message });
          }
        });
      }
    },
    Deletebook(id) {
      let loader = this.$loading.show({
        canCancel: false,
      });
      ComponentService.deleteBook(id).then((res) => {
        loader.hide();
        if (res.success) {
          this.Getbooks();
           this.$toasted.global.my_messges({ message: res.message });
        } else {
          this.$toasted.global.my_messges({ message: res.message });
        }
      });
    },
  },
};
</script>
<style scoped>
table {
  color: white !important;
}
.form-control {
    height: calc(1.5em + 0.86rem + 2px) !important;
  }
</style>