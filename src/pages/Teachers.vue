<template>
  <div>
    <b-modal
      id="modal-no-backdrop"
      hide-backdrop
      content-class="shadow"
      title="Add Teacher"
    >
      <p class="my-2">
        <template>
          <div class="form-group">
            <input
              v-model="Teacher.t_name"
              class="form-control form-control-sm"
              placeholder="Name..."
            />
          </div>
          <div class="form-group">
            <input
              v-model="Teacher.t_phone"
              class="form-control form-control-sm"
              placeholder="Phone"
            />
          </div>
          <div class="form-group">
            <input
              v-model="Teacher.t_email"
              class="form-control form-control-sm"
              placeholder="Email"
            />
          </div>
          <div class="form-group">
            <select
              v-model="Teacher.t_book"
              class="form-control form-control-sm"
            >
              <option disabled value>Please select book</option>
              <option
                v-for="book in BookLists"
                :key="book._id"
                :value="book._id"
              >
                {{ book.b_name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <input
              v-model="Teacher.t_address"
              class="form-control form-control-sm"
              placeholder="Address"
            />
          </div>
        </template>
      </p>

      <template v-slot:modal-footer="{ hide }">
        <b-button size="sm" variant="success" @click="Addteacher()"
          >Add</b-button
        >
        <b-button size="sm" class="btn-warning" @click="insertManyTeachers()"
          >Add Multiple</b-button
        >
        <b-button size="sm" variant="danger" @click="hide()">Cancel</b-button>
      </template>
    </b-modal>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image: url('img/header.jpg')"
      ></parallax>
      <div class="container mt-5">
        <div class="content-center brand">
          <h1 class="h1-seo">Teachers.</h1>
          <h3>A beautiful Bootstrap 4 UI kit.</h3>
        </div>
      </div>
      <div class="container">
        <b-button
          class="pull-right"
          size="sm"
          variant="success"
          v-b-modal.modal-no-backdrop
          >Add Teacher</b-button
        >
        <table class="table table-striped">
          <thead>
            <tr>
              <th><input type="checkbox" v-model="selectAll" @click="selectAllTeachers()" /></th>
              <th>S.NO</th>
              <th>Teacher Name</th>
              <th>Teacher Phone</th>
              <th>Teacher Email</th>
              <th>Teacher Book</th>
              <th>Create By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(teacher, index) in TeacherList" :key="teacher._id">
              <td><input type="checkbox" v-model="teacher.select" /></td>
              <td>{{ index + 1 }}</td>
              <td>{{ teacher.t_name }}</td>
              <td>{{ teacher.t_phone }}</td>
              <td>{{ teacher.t_email }}</td>
              <td>{{ teacher.t_book ? teacher.t_book.b_name : "" }}</td>
              <td>{{ teacher.createdBy.name }}</td>
              <td>
                <i
                  v-b-modal.modal-no-backdrop
                  @click="onEditModal(teacher)"
                  class="now-ui-icons ui-2_settings-90 mr-2"
                ></i>
                <i
                  @click="DeleteTeacher(teacher._id)"
                  class="now-ui-icons ui-1_simple-remove"
                ></i>
              </td>
            </tr>
            <tr class="content-center" v-if="TeacherList.length == 0">
              There is No Teacher in Data Base
            </tr>
            <tr>
              <td>Total #{{ totalElement }}</td>
              <td colspan="8">
                <b-pagination
                  class="pull-right"
                  v-model="page"
                  :per-page="pageSize"
                  :total-rows="totalElement"
                  v-on:input="updatePage(page)"
                ></b-pagination>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { Tooltip } from "element-ui";
import ComponentService from "./../service/ComponentService";
export default {
  [Tooltip.name]: Tooltip,
  name: "teachers",
  data() {
    return {
      page: 1,
      pageSize: 2,
      totalElement: 0,
      selectAll: false,
      Teacher: {
        t_name: "",
        t_email: "",
        t_phone: "",
        t_address: "",
        t_book: "",
      },
      TeacherList: [],
      BookLists: [],
      insertManyTeacher: [],
    };
  },
  mounted() {
    this.GetTeachers();
    this.Getbooks();
  },
  methods: {
    updatePage(page) {
      this.GetTeachers();
    },
    selectAllTeachers:function() {
       this.selectAll = !this.selectAll;
      this.TeacherList.forEach((element) => {
        element.select = this.selectAll;
      });
    },
    insertManyTeachers() {
      //const values = this.Book;
      this.insertManyTeacher.push(this.Teacher);
      this.Teacher = {};
    },
    onEditModal(values) {
      this.Teacher = values;
      if (this.Teacher.t_book._id) {
        this.Teacher.t_book = this.Teacher.t_book._id;
      }
    },
    Getbooks() {
      let loader = this.$loading.show({
        canCancel: false,
      });
      ComponentService.getBooks(1, 30).then((res) => {
        loader.hide();
        if (res.success) {
          this.BookLists = res.BooksList.books;
        } else {
          this.BookLists = [];
        }
      });
    },
    GetTeachers() {
      let loader = this.$loading.show({
        canCancel: false,
      });
      ComponentService.getTeachers(this.page, this.pageSize).then((res) => {
        loader.hide();
        if (res.success) {
          this.TeacherList = res.teacherList.teachers;
          this.totalElement = res.teacherList.totalCount;
          // this.TeacherList.teachers.forEach((element) => {
          //   element.select = false;
          // });
        } else {
          this.TeacherList = [];
        }
      });
    },
    Addteacher() {
      let loader = this.$loading.show({
        canCancel: false,
      });
      if (!this.Teacher._id) {
        if (this.Teacher.t_name !== undefined) {
          this.insertManyTeacher.push(this.Teacher);
        }
        ComponentService.addTeacher(this.insertManyTeacher)
          .then((res) => {
            loader.hide();
            if (res.success) {
              this.GetTeachers();
              this.insertManyTeacher = [];
              this.Teacher = {};
              this.$toasted.global.my_messges({ message: res.message });
            } else {
              this.$toasted.global.my_messges({ message: res.message });
            }
          })
          .catch((error) => {
            loader.hide();
            this.$toasted.global.my_messges({
              message: error.response.data.message,
            });
          });
      } else {
        ComponentService.updateTeacher(this.Teacher)
          .then((res) => {
            loader.hide();
            if (res.success) {
              this.GetTeachers();
              this.Teacher = {};
              this.insertManyTeacher = [];
              this.$toasted.global.my_messges({ message: res.message });
            } else {
              this.$toasted.global.my_messges({ message: res.message });
            }
          })
          .catch((error) => {
            loader.hide();
            this.$toasted.global.my_messges({
              message: error.response.data.message,
            });
          });
      }
    },
    DeleteTeacher(id) {
      let loader = this.$loading.show({
        canCancel: false,
      });
      ComponentService.deleteTeacher(id).then((res) => {
        loader.hide();
        if (res.success) {
          this.GetTeachers();
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